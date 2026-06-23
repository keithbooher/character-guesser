import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { assignCharacters } from '@/lib/game';
import { sendCharacterEmail } from '@/lib/email';

export async function POST(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const session = await prisma.session.findUnique({
      where: { code: params.code.toUpperCase() },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const { p1, p2, sharedTrait } = await assignCharacters(session.id, prisma);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        p1CharacterId: p1.id,
        p2CharacterId: p2.id,
        sharedTrait: sharedTrait ?? null,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (session.p1Email) {
      await sendCharacterEmail(session.p1Email, p2.name, (p2 as any).ip.title, appUrl);
    }
    if (session.p2Email) {
      await sendCharacterEmail(session.p2Email, p1.name, (p1 as any).ip.title, appUrl);
    }

    return NextResponse.json({
      p1Character: { name: p1.name, ipTitle: (p1 as any).ip.title },
      p2Character: { name: p2.name, ipTitle: (p2 as any).ip.title },
    });
  } catch (err) {
    console.error('/api/sessions/[code]/assign POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
