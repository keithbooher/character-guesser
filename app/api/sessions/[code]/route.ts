import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
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

    return NextResponse.json({
      id: session.id,
      code: session.code,
      mode: session.mode,
      p1Done: session.p1Done,
      p2Done: session.p2Done,
      p1CharacterId: session.p1CharacterId,
      p2CharacterId: session.p2CharacterId,
      p1Email: session.p1Email,
      p2Email: session.p2Email,
    });
  } catch (err) {
    console.error('/api/sessions/[code] GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
