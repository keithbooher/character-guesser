import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { reviewed } = body as { reviewed?: boolean };

    if (reviewed !== true) {
      return NextResponse.json({ error: 'Only reviewed: true is accepted' }, { status: 400 });
    }

    const suggestion = await prisma.suggestion.update({
      where: { id: parseInt(id, 10) },
      data: { reviewed: true },
    });

    return NextResponse.json({ ok: true, id: suggestion.id });
  } catch (err) {
    console.error('/api/suggestions/[id] PATCH error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
