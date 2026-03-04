import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [schedules, trialSlots] = await Promise.all([
    prisma.schedule.findMany(),
    prisma.trialSlot.findMany({ include: { booking: true } }),
  ]);

  const events = [
    ...schedules.map((s) => ({
      id: `schedule-${s.id}`,
      title: s.title,
      start: s.startTime.toISOString(),
      end: s.endTime.toISOString(),
      backgroundColor: '#4f7bbd',
      borderColor: '#3a5fa0',
      extendedProps: { type: 'schedule' },
    })),
    ...trialSlots.map((slot) => ({
      id: `trial-${slot.id}`,
      title:
        slot.status === 'FULL'
          ? `体験枠（予約済み）${slot.booking ? ` — ${slot.booking.childName}` : ''}`
          : slot.status === 'CLOSED'
          ? '体験枠（締切）'
          : '体験枠（空き）',
      start: slot.startTime.toISOString(),
      end: slot.endTime.toISOString(),
      backgroundColor:
        slot.status === 'FULL' ? '#9e9e9e' : slot.status === 'CLOSED' ? '#bdbdbd' : '#5a9e6f',
      borderColor:
        slot.status === 'FULL' ? '#757575' : slot.status === 'CLOSED' ? '#9e9e9e' : '#3d7a52',
      extendedProps: { type: 'trial', slotId: slot.id, status: slot.status },
    })),
  ];

  return NextResponse.json(events);
}
