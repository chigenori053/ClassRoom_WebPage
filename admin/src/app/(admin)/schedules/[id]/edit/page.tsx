import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { updateSchedule } from '../../actions';
import styles from '../../schedules.module.css';

/** Date を datetime-local input 用に JST 文字列へ変換 */
function toInputValue(date: Date): string {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 16);
}

export default async function EditSchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const schedule = await prisma.schedule.findUnique({ where: { id: Number(id) } });
  if (!schedule) notFound();

  const action = async (formData: FormData) => {
    'use server';
    await updateSchedule(schedule.id, formData);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>スケジュール編集</h1>
        <Link href="/schedules">
          <Button variant="ghost" size="sm">← 一覧へ</Button>
        </Link>
      </div>

      <div className={styles.formCard}>
        <form action={action} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>タイトル</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={schedule.title}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="startTime" className={styles.label}>開始日時</label>
              <input
                id="startTime"
                name="startTime"
                type="datetime-local"
                required
                defaultValue={toInputValue(schedule.startTime)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="endTime" className={styles.label}>終了日時</label>
              <input
                id="endTime"
                name="endTime"
                type="datetime-local"
                required
                defaultValue={toInputValue(schedule.endTime)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="location" className={styles.label}>場所</label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={schedule.location}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              メモ <span className={styles.optional}>（任意）</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={schedule.description ?? ''}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="submit">保存して Google Calendar に同期</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
