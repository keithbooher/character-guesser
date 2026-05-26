import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { assignCharacters } from '@/lib/game';
import { sendCharacterEmail } from '@/lib/email';

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const body = await req.json();
    const { player, selections } = body as {
      player: 1 | 2;
      selections: Array<{ ipId: number; known: boolean }>;
    };

    if (!player || !selections || !Array.isArray(selections)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const session = await prisma.session.findUnique({
      where: { code: params.code.toUpperCase() },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Upsert selections
    for (const sel of selections) {
      await prisma.selection.upsert({
        where: {
          sessionId_player_ipId: {
            sessionId: session.id,
            player,
            ipId: sel.ipId,
          },
        },
        update: { known: sel.known },
        create: {
          sessionId: session.id,
          player,
          ipId: sel.ipId,
          known: sel.known,
        },
      });
    }

    // Mark player done
    const updateData =
      player === 1 ? { p1Done: true } : { p2Done: true };
    const updated = await prisma.session.update({
      where: { id: session.id },
      data: updateData,
    });

    // If both done, auto-assign characters
    const bothDone = updated.p1Done && updated.p2Done;
    if (bothDone && !updated.p1CharacterId && !updated.p2CharacterId) {
      const { p1, p2 } = await assignCharacters(session.id, prisma);

      await prisma.session.update({
        where: { id: session.id },
        data: {
          p1CharacterId: p1.id,
          p2CharacterId: p2.id,
        },
      });

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

      // Send emails if provided
      if (updated.p1Email) {
        // P1 gets P2's character
        await sendCharacterEmail(updated.p1Email, p2.name, (p2 as any).ip.title, appUrl);
      }
      if (updated.p2Email) {
        // P2 gets P1's character
        await sendCharacterEmail(updated.p2Email, p1.name, (p1 as any).ip.title, appUrl);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('/api/sessions/[code]/select POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
