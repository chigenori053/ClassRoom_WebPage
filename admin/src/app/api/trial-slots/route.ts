import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { gasCreateEvent } from '@/lib/gas';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { startTime, endTime } = await req.json() as { startTime: string; endTime: string };

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const gasResult = await gasCreateEvent({
    title: '【体験枠】KuKKA プログラミング教室',
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
    description: '体験レッスン受け入れ枠',
  });

  const slot = await prisma.trialSlot.create({
    data: {
      startTime: startDate,
      endTime: endDate,
      gasEventId: gasResult.success ? (gasResult.eventId ?? null) : null,
    },
  });

  return NextResponse.json(slot);
}
