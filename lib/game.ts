import { PrismaClient } from '@prisma/client';

export async function assignCharacters(sessionId: string, prisma: PrismaClient) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      selections: {
        include: {
          ip: {
            include: { characters: true },
          },
        },
      },
    },
  });

  if (!session) throw new Error('Session not found');

  // Find IPs both players marked as known
  const p1Known = new Set(
    session.selections.filter((s) => s.player === 1 && s.known).map((s) => s.ipId)
  );
  const p2Known = new Set(
    session.selections.filter((s) => s.player === 2 && s.known).map((s) => s.ipId)
  );
  const intersection = Array.from(p1Known).filter((id) => p2Known.has(id));

  // Get characters from intersection IPs (or union as fallback)
  let ipIds = intersection.length > 0
    ? intersection
    : Array.from(new Set([...Array.from(p1Known), ...Array.from(p2Known)]));

  let allChars = ipIds.length > 0
    ? await prisma.character.findMany({ where: { ipId: { in: ipIds } }, include: { ip: true } })
    : [];

  if (allChars.length < 2) {
    // Last resort: pick from any IP
    allChars = await prisma.character.findMany({ include: { ip: true } });
  }

  // Shuffle and pick 2 distinct characters
  const shuffled = [...allChars].sort(() => Math.random() - 0.5);
  const p1Char = shuffled[0];
  const p2Char = shuffled.find((c) => c.id !== p1Char.id)!;

  return { p1: p1Char, p2: p2Char };
}

export function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
