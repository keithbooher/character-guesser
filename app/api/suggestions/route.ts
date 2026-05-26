import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const VALID_TYPES = ['movie', 'tv', 'game', 'anime', 'cartoon', 'manga', 'other'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, type, notes } = body as { title?: string; type?: string; notes?: string };

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    await prisma.suggestion.create({
      data: {
        title: title.trim(),
        type,
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('/api/suggestions POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const suggestions = await prisma.suggestion.findMany({
      where: { reviewed: false },
      orderBy: { submittedAt: 'desc' },
    });
    return NextResponse.json(suggestions);
  } catch (err) {
    console.error('/api/suggestions GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
