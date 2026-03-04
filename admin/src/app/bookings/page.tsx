import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { updateBookingStatus } from '../actions';
import styles from './bookings.module.css';

export default async function AdminBookingsPage() {
    const cookieStore = await cookies();
    if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>体験レッスン予約管理</h1>
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm">← ダッシュボードへ</Button>
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>送信日時</th>
                            <th>保護者名（お子様名 / 学年）</th>
                            <th>希望コース / 第一希望日</th>
                            <th>連絡先</th>
                            <th>ステータス</th>
                            <th>その他・質問</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                    予約がありません。
                                </td>
                            </tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b.id} className={b.status === 'PENDING' ? styles.rowHighlight : ''}>
                                    <td>
                                        {new Date(b.createdAt).toLocaleDateString('ja-JP')}<br />
                                        {new Date(b.createdAt).toLocaleTimeString('ja-JP')}
                                    </td>
                                    <td>
                                        <strong>{b.parentName}</strong><br />
                                        {b.childName}（{b.childAge}）
                                    </td>
                                    <td>
                                        {b.course}<br />
                                        <span className={styles.dateBadge}>
                                            {new Date(b.preferredDate).toLocaleDateString('ja-JP')}
                                        </span>
                                    </td>
                                    <td className={styles.contactCell}>
                                        <a href={`mailto:${b.email}`}>{b.email}</a>
                                        {b.phone && <div>{b.phone}</div>}
                                    </td>
                                    <td>
                                        <form action={async () => {
                                            'use server';
                                            const next =
                                                b.status === 'PENDING' ? 'CONFIRMED' :
                                                b.status === 'CONFIRMED' ? 'CANCELLED' : 'PENDING';
                                            await updateBookingStatus(b.id, next);
                                        }}>
                                            <button
                                                type="submit"
                                                className={`${styles.statusBadge} ${styles['status' + b.status]}`}
                                            >
                                                {b.status === 'PENDING' ? '未確認（確認済みにする）' :
                                                 b.status === 'CONFIRMED' ? '確認済み（キャンセルにする）' :
                                                 'キャンセル（未確認に戻す）'}
                                            </button>
                                        </form>
                                    </td>
                                    <td className={styles.notesCell}>{b.notes}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
