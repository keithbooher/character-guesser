import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateCode } from '@/lib/game';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, p1Email, p2Email } = body as {
      mode: 'online' | 'local';
      p1Email?: string;
      p2Email?: string;
    };

    if (!mode || !['online', 'local'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }

    // Generate unique code
    let code = generateCode();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.session.findUnique({ where: { code } });
      if (!existing) break;
      code = generateCode();
      attempts++;
    }

    const session = await prisma.session.create({
      data: {
        code,
        mode,
        p1Email: p1Email || null,
        p2Email: p2Email || null,
      },
    });

    return NextResponse.json({ id: session.id, code: session.code, mode: session.mode });
  } catch (err) {
    console.error('/api/sessions POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
