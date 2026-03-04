import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { deleteSchedule } from './actions';
import styles from './schedules.module.css';

function formatJST(date: Date): string {
  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function SchedulesPage() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

  const schedules = await prisma.schedule.findMany({
    orderBy: { startTime: 'asc' },
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>授業スケジュール管理</h1>
        <div className={styles.headerActions}>
          <Link href="/schedules/new">
            <Button size="sm">＋ 新規スケジュール</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← ダッシュボードへ</Button>
          </Link>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>開始</th>
              <th>終了</th>
              <th>場所</th>
              <th>Google Calendar</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  スケジュールがありません。「新規スケジュール」から追加してください。
                </td>
              </tr>
            ) : (
              schedules.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.title}</strong>
                    {s.description && (
                      <p className={styles.desc}>{s.description}</p>
                    )}
                  </td>
                  <td className={styles.dateCell}>{formatJST(s.startTime)}</td>
                  <td className={styles.dateCell}>{formatJST(s.endTime)}</td>
                  <td>{s.location}</td>
                  <td>
                    <span className={s.gasEventId ? styles.synced : styles.unsynced}>
                      {s.gasEventId ? '✓ 同期済み' : '✗ 未同期'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/schedules/${s.id}/edit`}>
                        <Button variant="ghost" size="sm">編集</Button>
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deleteSchedule(s.id);
                      }}>
                        <Button type="submit" variant="ghost" size="sm" aria-label={`${s.title}を削除`}>
                          削除
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
