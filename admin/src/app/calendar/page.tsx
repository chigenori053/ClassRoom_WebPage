import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/db';
import { EventInput } from '@fullcalendar/core';
import CalendarView from './CalendarView';
import styles from './calendar.module.css';

export default async function CalendarPage() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

  const [schedules, trialSlots] = await Promise.all([
    prisma.schedule.findMany(),
    prisma.trialSlot.findMany({ include: { booking: true } }),
  ]);

  const events: EventInput[] = [
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>カレンダー</h1>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">← ダッシュボードへ</Button>
        </Link>
      </div>
      <CalendarView initialEvents={events} />
    </div>
  );
}
