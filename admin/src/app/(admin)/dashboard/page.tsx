import { prisma } from '@/lib/db';
import styles from './dashboard.module.css';

export default async function AdminDashboardPage() {
    const [pendingBookings, articleCounts, upcomingSchedules, newInquiries] = await Promise.all([
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.article.groupBy({ by: ['status'], _count: true }),
        prisma.schedule.count({ where: { startTime: { gte: new Date() } } }),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
    ]);

    const publishedCount = articleCounts.find((c) => c.status === 'PUBLISHED')?._count ?? 0;
    const draftCount = articleCounts.find((c) => c.status === 'DRAFT')?._count ?? 0;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>ダッシュボード</h1>
            </div>

            <div className={styles.grid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>未確認の予約</div>
                    <div className={`${styles.statValue} ${pendingBookings > 0 ? styles.statAlert : ''}`}>
                        {pendingBookings}<span className={styles.statUnit}>件</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>未対応の問い合わせ</div>
                    <div className={`${styles.statValue} ${newInquiries > 0 ? styles.statAlert : ''}`}>
                        {newInquiries}<span className={styles.statUnit}>件</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>今後の授業予定</div>
                    <div className={styles.statValue}>
                        {upcomingSchedules}<span className={styles.statUnit}>件</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>コラム記事</div>
                    <div className={styles.statValue}>
                        {publishedCount}<span className={styles.statUnit}>公開中</span>
                    </div>
                    <div className={styles.statSub}>下書き {draftCount} 件</div>
                </div>
            </div>
        </div>
    );
}
