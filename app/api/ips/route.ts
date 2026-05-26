import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const ips = await prisma.iP.findMany({
      select: { id: true, title: true, type: true, decade: true },
      orderBy: [{ type: 'asc' }, { title: 'asc' }],
    });
    return NextResponse.json(ips);
  } catch (err) {
    console.error('/api/ips GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
