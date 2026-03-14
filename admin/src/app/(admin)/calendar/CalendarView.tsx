'use client';

import { useCallback, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import styles from './calendar.module.css';

type Props = {
  initialEvents: EventInput[];
};

export default function CalendarView({ initialEvents }: Props) {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventInput[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const refreshEvents = useCallback(async () => {
    const res = await fetch('/api/calendar-events');
    if (res.ok) setEvents(await res.json());
  }, []);

  const handleDateClick = useCallback(async (arg: DateClickArg) => {
    const startTime = arg.date;
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1時間枠

    if (!confirm(`体験枠を作成しますか？\n${startTime.toLocaleString('ja-JP')} 〜 ${endTime.toLocaleString('ja-JP')}`)) return;

    setLoading(true);
    try {
      const res = await fetch('/api/trial-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }),
      });
      if (res.ok) {
        showMessage('体験枠を作成し Google Calendar に同期しました', 'success');
        await refreshEvents();
      } else {
        showMessage('作成に失敗しました', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [refreshEvents]);

  const handleEventClick = useCallback(async (arg: EventClickArg) => {
    const { type, slotId, status } = arg.event.extendedProps;

    if (type !== 'trial') return;
    if (status === 'FULL') {
      alert('この枠には予約が入っているため削除できません。');
      return;
    }

    if (!confirm(`体験枠を削除しますか？\n${arg.event.title}`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/trial-slots/${slotId}`, { method: 'DELETE' });
      if (res.ok) {
        showMessage('体験枠を削除しました', 'success');
        await refreshEvents();
      } else {
        const data = await res.json() as { error: string };
        showMessage(data.error ?? '削除に失敗しました', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [refreshEvents]);

  return (
    <div className={styles.calendarWrapper}>
      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      {loading && <div className={styles.loadingBar} />}

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#4f7bbd' }} />授業
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#5a9e6f' }} />体験枠（空き）
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#9e9e9e' }} />体験枠（予約済み）
        </span>
        <span className={styles.legendHint}>空き時間をクリックして体験枠を作成 / 体験枠をクリックして削除</span>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale="ja"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        slotMinTime="09:00:00"
        slotMaxTime="21:00:00"
        slotDuration="00:30:00"
        allDaySlot={false}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
}
