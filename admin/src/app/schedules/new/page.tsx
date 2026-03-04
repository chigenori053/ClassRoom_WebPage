import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { createSchedule } from '../actions';
import styles from '../schedules.module.css';

export default async function NewSchedulePage() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>新規スケジュール</h1>
        <Link href="/schedules">
          <Button variant="ghost" size="sm">← 一覧へ</Button>
        </Link>
      </div>

      <div className={styles.formCard}>
        <form action={createSchedule} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>タイトル</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="例：体験レッスン - 田中さん"
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
              defaultValue="KuKKA プログラミング教室"
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
              placeholder="コース名・担当者・備考など"
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
