'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './booking.module.css';

type TrialSlot = {
    id: number;
    startTime: string;
    endTime: string;
    status: string;
};

type FormData = {
    email: string;
    phone: string;
    childName: string;
    childAge: string;
    parentName: string;
    course: string;
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function toDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function groupSlotsByDate(slots: TrialSlot[]): Record<string, TrialSlot[]> {
    const groups: Record<string, TrialSlot[]> = {};
    slots.forEach((slot) => {
        const key = toDateKey(new Date(slot.startTime));
        if (!groups[key]) groups[key] = [];
        groups[key].push(slot);
    });
    return groups;
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
    while (days.length % 7 !== 0) days.push(null);

    return days;
}

function formatTime(iso: string): string {
    const d = new Date(iso);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatDateJa(date: Date): string {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${WEEKDAYS[date.getDay()]}）`;
}

export default function BookingCalendar() {
    const [slots, setSlots] = useState<TrialSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TrialSlot | null>(null);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        phone: '',
        childName: '',
        childAge: '',
        parentName: '',
        course: 'Sproutコース',
    });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'conflict'>('idle');

    useEffect(() => {
        fetch('/api/trial-slots')
            .then((res) => res.json())
            .then((data) => { setSlots(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const calendarDays = getCalendarDays(year, month);
    const slotsByDate = groupSlotsByDate(slots);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const handleDayClick = (day: Date) => {
        const key = toDateKey(day);
        if (!slotsByDate[key]) return;
        setSelectedDate(day);
        setSelectedSlot(null);
    };

    const handleSlotClick = (slot: TrialSlot) => {
        setSelectedSlot(slot);
        setSubmitStatus('idle');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot) return;
        setSubmitStatus('submitting');

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, trialSlotId: selectedSlot.id }),
            });

            if (res.status === 409) {
                setSubmitStatus('conflict');
                setSelectedSlot(null);
                await res.json();
                setSlots((prev) =>
                    prev.map((s) => (s.id === selectedSlot.id ? { ...s, status: 'FULL' } : s))
                );
                return;
            }
            if (res.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className={styles.successBox}>
                <p className={styles.successTitle}>ご予約ありがとうございます。</p>
                <p className={styles.successDesc}>
                    ご入力いただいたメールアドレス宛に、担当者から確認のご連絡を差し上げます。<br />
                    しばらくお待ちください。
                </p>
            </div>
        );
    }

    if (loading) {
        return <p className={styles.loadingText}>空き枠を読み込み中...</p>;
    }

    const selectedDateSlots = selectedDate ? (slotsByDate[toDateKey(selectedDate)] ?? []) : [];

    return (
        <div className={styles.calendarWrapper}>
            {/* カレンダーヘッダー */}
            <div className={styles.calendarHeader}>
                <button onClick={prevMonth} className={styles.navBtn} aria-label="前の月">‹</button>
                <span className={styles.monthLabel}>{year}年 {month + 1}月</span>
                <button onClick={nextMonth} className={styles.navBtn} aria-label="次の月">›</button>
            </div>

            {/* 曜日ヘッダー */}
            <div className={styles.weekdayRow}>
                {WEEKDAYS.map((d) => (
                    <div key={d} className={`${styles.weekdayCell} ${d === '日' ? styles.sunday : d === '土' ? styles.saturday : ''}`}>
                        {d}
                    </div>
                ))}
            </div>

            {/* カレンダーグリッド */}
            <div className={styles.calendarGrid}>
                {calendarDays.map((day, i) => {
                    if (!day) return <div key={i} className={styles.emptyCell} />;

                    const key = toDateKey(day);
                    const hasSlots = !!slotsByDate[key];
                    const isPast = day < today;
                    const isSelected = selectedDate ? toDateKey(selectedDate) === key : false;
                    const isToday = toDateKey(day) === toDateKey(today);

                    return (
                        <button
                            key={i}
                            onClick={() => !isPast && hasSlots && handleDayClick(day)}
                            disabled={isPast || !hasSlots}
                            className={[
                                styles.dayCell,
                                isPast ? styles.dayCellPast : '',
                                hasSlots && !isPast ? styles.dayCellAvailable : '',
                                isSelected ? styles.dayCellSelected : '',
                                isToday ? styles.dayCellToday : '',
                                day.getDay() === 0 ? styles.sundayText : '',
                                day.getDay() === 6 ? styles.saturdayText : '',
                            ].join(' ')}
                        >
                            <span className={styles.dayNumber}>{day.getDate()}</span>
                            {hasSlots && !isPast && (
                                <span className={styles.slotDot} aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>

            <p className={styles.legendText}>
                <span className={styles.legendDot} aria-hidden="true" />
                体験枠あり
            </p>

            {/* 時間枠リスト */}
            {selectedDate && (
                <div className={styles.slotSection}>
                    <h3 className={styles.slotSectionTitle}>{formatDateJa(selectedDate)} の空き枠</h3>
                    <div className={styles.slotList}>
                        {selectedDateSlots.map((slot) => (
                            <button
                                key={slot.id}
                                onClick={() => handleSlotClick(slot)}
                                className={`${styles.slotBtn} ${selectedSlot?.id === slot.id ? styles.slotBtnSelected : ''}`}
                            >
                                {formatTime(slot.startTime)} 〜 {formatTime(slot.endTime)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 予約フォーム */}
            {selectedSlot && (
                <div className={styles.formSection}>
                    <div className={styles.selectedInfo}>
                        <span className={styles.selectedInfoLabel}>予約日時</span>
                        <span className={styles.selectedInfoValue}>
                            {formatDateJa(new Date(selectedSlot.startTime))}&nbsp;
                            {formatTime(selectedSlot.startTime)} 〜 {formatTime(selectedSlot.endTime)}
                        </span>
                    </div>

                    {submitStatus === 'conflict' && (
                        <p className={styles.errorMessage}>
                            この枠は先ほど埋まってしまいました。別の日時をお選びください。
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label htmlFor="parentName">保護者様のお名前 <span className={styles.required}>必須</span></label>
                                <input required id="parentName" name="parentName" type="text" className={styles.input} value={formData.parentName} onChange={handleChange} placeholder="例：山田 花子" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="childName">お子様のお名前 <span className={styles.required}>必須</span></label>
                                <input required id="childName" name="childName" type="text" className={styles.input} value={formData.childName} onChange={handleChange} placeholder="例：山田 太郎" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="childAge">お子様の学年 <span className={styles.required}>必須</span></label>
                                <input required id="childAge" name="childAge" type="text" className={styles.input} value={formData.childAge} onChange={handleChange} placeholder="例：小学3年生" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">メールアドレス <span className={styles.required}>必須</span></label>
                                <input required id="email" name="email" type="email" className={styles.input} value={formData.email} onChange={handleChange} placeholder="例：example@email.com" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">電話番号</label>
                                <input id="phone" name="phone" type="tel" className={styles.input} value={formData.phone} onChange={handleChange} placeholder="例：090-0000-0000" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="course">体験希望コース <span className={styles.required}>必須</span></label>
                                <select required id="course" name="course" className={styles.input} value={formData.course} onChange={handleChange}>
                                    <option value="Sproutコース">Sproutコース（Scratch・マイクラ）</option>
                                    <option value="Growコース">Growコース（Python・JavaScript）</option>
                                    <option value="Bloomコース">Bloomコース（アプリ開発）</option>
                                    <option value="未定（相談したい）">未定（相談したい）</option>
                                </select>
                            </div>
                        </div>

                        {submitStatus === 'error' && (
                            <p className={styles.errorMessage}>
                                エラーが発生しました。入力内容をご確認の上、再度お試しください。
                            </p>
                        )}

                        <div className={styles.submitSection}>
                            <Button type="submit" size="lg" variant="primary" disabled={submitStatus === 'submitting'}>
                                {submitStatus === 'submitting' ? '送信中...' : 'この日時で予約する'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
