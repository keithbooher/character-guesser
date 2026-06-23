import { PrismaClient } from '@prisma/client';

type CharWithIP = {
  id: number;
  name: string;
  ipId: number;
  traits: string;
  ip: { type: string; decade: string | null };
};

const TRAIT_LABELS: Record<string, string> = {
  bald: 'both of your characters are bald',
  glasses: 'both of your characters wear glasses',
  beard: 'both of your characters have a beard',
  green: 'both of your characters are green',
  twin: 'both of your characters have a twin',
  scar: 'both of your characters have a notable scar or disfigurement',
  blonde: 'both of your characters are blonde',
  redhead: 'both of your characters have red or orange hair',
  white_hair: 'both of your characters have white or silver hair',
  villain: 'both of your characters are (or were) villains',
  antihero: 'both of your characters are antiheroes',
  redemption_arc: 'both of your characters have a redemption arc',
  dies: 'both of your characters die in their story',
  royalty: 'both of your characters are royalty or nobility',
  orphan: 'both of your characters are orphans',
  supernatural: 'both of your characters are supernatural beings',
  animal: 'both of your characters are animals',
  robot: 'both of your characters are robots or cyborgs',
  magic: 'both of your characters use magic',
  has_powers: 'both of your characters have superpowers',
  genius: 'both of your characters are exceptionally intelligent',
  scientist: 'both of your characters are scientists or doctors',
  mentor: 'both of your characters are mentors to the main hero',
  detective: 'both of your characters work as detectives or investigators',
  spy: 'both of your characters are spies or secret agents',
  sidekick: 'both of your characters are loyal sidekicks',
  comic_relief: 'both of your characters are comic relief',
  musician: 'both of your characters are musicians',
  fighter: 'both of your characters are skilled fighters',
  parent: 'both of your characters are parents',
  child: 'both of your characters are children',
  elderly: 'both of your characters are elderly',
  has_siblings: 'both of your characters have siblings',
};

function traitPriority(trait: string): number {
  // Lower = more surprising/fun, shown first
  if (['bald', 'glasses', 'beard', 'green', 'twin', 'scar'].includes(trait)) return 0;
  if (['blonde', 'redhead', 'white_hair'].includes(trait)) return 1;
  if (['villain', 'antihero', 'redemption_arc', 'dies', 'royalty', 'orphan'].includes(trait)) return 2;
  if (['animal', 'robot', 'supernatural'].includes(trait)) return 3;
  if (trait.startsWith('initial:')) return 4;
  if (['magic', 'has_powers', 'genius', 'scientist', 'mentor', 'detective', 'spy', 'sidekick', 'comic_relief', 'musician'].includes(trait)) return 5;
  if (['fighter', 'parent', 'child', 'elderly', 'has_siblings'].includes(trait)) return 6;
  if (trait.startsWith('decade:')) return 7;
  return 8; // animated / type
}

export function traitLabel(trait: string): string {
  if (trait in TRAIT_LABELS) return TRAIT_LABELS[trait];
  if (trait.startsWith('initial:')) {
    const letter = trait.slice(8);
    return `both of your character's names start with "${letter}"`;
  }
  if (trait.startsWith('decade:')) return `both characters are from the ${trait.slice(7)}`;
  if (trait === 'animated') return 'both characters are animated';
  if (trait === 'type:tv') return 'both characters are from TV shows';
  if (trait === 'type:movie') return 'both characters are from movies';
  if (trait === 'type:game') return 'both characters are from video games';
  return 'your characters share something in common';
}

function getTraits(char: CharWithIP): string[] {
  const traits: string[] = [];

  // Character-level traits from DB
  try {
    const charTraits: string[] = JSON.parse(char.traits || '[]');
    traits.push(...charTraits);
  } catch {
    // ignore malformed
  }

  // Name initial
  const initial = char.name.trim()[0]?.toUpperCase();
  if (initial && /[A-Z]/.test(initial)) traits.push(`initial:${initial}`);

  // IP-level derived traits
  if (char.ip.decade) traits.push(`decade:${char.ip.decade}`);
  if (['cartoon', 'anime', 'manga'].includes(char.ip.type)) {
    traits.push('animated');
  } else {
    traits.push(`type:${char.ip.type}`);
  }

  return traits;
}

function pickSharedTrait(chars: CharWithIP[]): { p1: CharWithIP; p2: CharWithIP; trait: string } | null {
  const traitMap = new Map<string, CharWithIP[]>();
  for (const char of chars) {
    for (const t of getTraits(char)) {
      if (!traitMap.has(t)) traitMap.set(t, []);
      traitMap.get(t)!.push(char);
    }
  }

  // Keep only traits where at least 2 characters from different IPs share it
  const valid = Array.from(traitMap.entries())
    .filter(([, cs]) => new Set(cs.map((c) => c.ipId)).size >= 2)
    .sort(([a], [b]) => traitPriority(a) - traitPriority(b));

  if (valid.length === 0) return null;

  // Among all traits tied at the top priority level, pick one randomly
  const topPriority = traitPriority(valid[0][0]);
  const candidates = valid.filter(([t]) => traitPriority(t) === topPriority);
  const [trait, traitChars] = candidates[Math.floor(Math.random() * candidates.length)];

  const shuffled = [...traitChars].sort(() => Math.random() - 0.5);
  const p1 = shuffled[0];
  const p2 = shuffled.find((c) => c.ipId !== p1.ipId)!;

  return { p1, p2, trait: traitLabel(trait) };
}

export async function assignCharacters(sessionId: string, prisma: PrismaClient) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      selections: {
        include: {
          ip: { include: { characters: true } },
        },
      },
    },
  });

  if (!session) throw new Error('Session not found');

  const p1Known = new Set(
    session.selections.filter((s) => s.player === 1 && s.known).map((s) => s.ipId)
  );
  const p2Known = new Set(
    session.selections.filter((s) => s.player === 2 && s.known).map((s) => s.ipId)
  );
  const intersection = Array.from(p1Known).filter((id) => p2Known.has(id));

  let ipIds =
    intersection.length > 0
      ? intersection
      : Array.from(new Set([...Array.from(p1Known), ...Array.from(p2Known)]));

  let allChars: CharWithIP[] =
    ipIds.length > 0
      ? await prisma.character.findMany({ where: { ipId: { in: ipIds } }, include: { ip: true } })
      : [];

  if (allChars.length < 2) {
    allChars = await prisma.character.findMany({ include: { ip: true } });
  }

  const result = pickSharedTrait(allChars);
  if (result) {
    return { p1: result.p1, p2: result.p2, sharedTrait: result.trait };
  }

  // Fallback: no shared trait found
  const shuffled = [...allChars].sort(() => Math.random() - 0.5);
  const p1 = shuffled[0];
  const p2 = shuffled.find((c) => c.id !== p1.id)!;
  return { p1, p2, sharedTrait: null };
}

export function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
