import { prisma } from '@/lib/db';
import { updateInquiryStatus } from '../../actions';
import styles from '../bookings/bookings.module.css';
import inquiryStyles from './inquiries.module.css';

export default async function InquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>スケジュール外 お問い合わせ管理</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>受信日時</th>
                            <th>保護者名（お子様名 / 学年）</th>
                            <th>連絡先</th>
                            <th>希望コース</th>
                            <th>希望日時の候補</th>
                            <th>お問い合わせ内容</th>
                            <th>ステータス</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length === 0 ? (
                            <tr>
                                <td colSpan={7} className={inquiryStyles.emptyCell}>
                                    お問い合わせはまだありません。
                                </td>
                            </tr>
                        ) : (
                            inquiries.map((inq) => (
                                <tr key={inq.id} className={inq.status === 'NEW' ? styles.rowHighlight : ''}>
                                    <td>
                                        {new Date(inq.createdAt).toLocaleDateString('ja-JP')}<br />
                                        {new Date(inq.createdAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td>
                                        <strong>{inq.parentName}</strong><br />
                                        {inq.childName}（{inq.childAge}）
                                    </td>
                                    <td className={styles.contactCell}>
                                        <a href={`mailto:${inq.email}`}>{inq.email}</a>
                                        {inq.phone && <div>{inq.phone}</div>}
                                    </td>
                                    <td>{inq.course ?? '未定'}</td>
                                    <td className={styles.notesCell}>{inq.preferredDates}</td>
                                    <td className={styles.notesCell}>{inq.message ?? '—'}</td>
                                    <td>
                                        <form action={async () => {
                                            'use server';
                                            const next =
                                                inq.status === 'NEW' ? 'REPLIED' :
                                                inq.status === 'REPLIED' ? 'CLOSED' : 'NEW';
                                            await updateInquiryStatus(inq.id, next);
                                        }}>
                                            <button
                                                type="submit"
                                                className={`${styles.statusBadge} ${inquiryStyles['status' + inq.status]}`}
                                            >
                                                {inq.status === 'NEW' ? '新規（返信済みにする）' :
                                                 inq.status === 'REPLIED' ? '返信済み（完了にする）' :
                                                 '完了（新規に戻す）'}
                                            </button>
                                        </form>
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
