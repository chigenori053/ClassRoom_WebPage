import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { logout } from '../actions';
import styles from './dashboard.module.css';

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

    const [pendingBookings, articleCounts, upcomingSchedules] = await Promise.all([
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.article.groupBy({ by: ['status'], _count: true }),
        prisma.schedule.count({ where: { startTime: { gte: new Date() } } }),
    ]);

    const publishedCount = articleCounts.find((c) => c.status === 'PUBLISHED')?._count ?? 0;
    const draftCount = articleCounts.find((c) => c.status === 'DRAFT')?._count ?? 0;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>管理ダッシュボード</h1>
                <form action={logout}>
                    <Button type="submit" variant="ghost" size="sm">ログアウト</Button>
                </form>
            </div>

            <div className={styles.grid}>
                <Link href="/bookings" className={styles.card}>
                    <div className={styles.cardIcon} aria-hidden="true">📋</div>
                    <div className={styles.cardBody}>
                        <h2 className={styles.cardTitle}>体験レッスン予約</h2>
                        <p className={styles.cardDesc}>予約の確認・ステータス管理</p>
                    </div>
                    {pendingBookings > 0 && (
                        <span className={styles.badge}>{pendingBookings} 件 未確認</span>
                    )}
                </Link>

                <Link href="/calendar" className={styles.card}>
                    <div className={styles.cardIcon} aria-hidden="true">🗓️</div>
                    <div className={styles.cardBody}>
                        <h2 className={styles.cardTitle}>カレンダー</h2>
                        <p className={styles.cardDesc}>授業・体験枠の一覧と枠管理</p>
                    </div>
                </Link>

                <Link href="/schedules" className={styles.card}>
                    <div className={styles.cardIcon} aria-hidden="true">📅</div>
                    <div className={styles.cardBody}>
                        <h2 className={styles.cardTitle}>授業スケジュール</h2>
                        <p className={styles.cardDesc}>スケジュール管理・Google Calendar 同期</p>
                    </div>
                    <span className={styles.cardMeta}>
                        今後の予定 {upcomingSchedules} 件
                    </span>
                </Link>

                <Link href="/columns" className={styles.card}>
                    <div className={styles.cardIcon} aria-hidden="true">✏️</div>
                    <div className={styles.cardBody}>
                        <h2 className={styles.cardTitle}>コラム管理</h2>
                        <p className={styles.cardDesc}>記事の作成・編集・公開</p>
                    </div>
                    <span className={styles.cardMeta}>
                        公開中 {publishedCount} / 下書き {draftCount}
                    </span>
                </Link>
            </div>
        </div>
    );
}
