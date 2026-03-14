import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import Link from 'next/link';
import BookingCalendar from './BookingCalendar';
import styles from './booking.module.css';

export const metadata: Metadata = {
    title: '体験レッスン予約 | KuKKA',
    description: '体験レッスンの空き枠をカレンダーから選んでご予約いただけます。',
};

export default function BookingPage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="TRIAL LESSON"
                subtitle="体験レッスンのご予約"
            />

            <Section>
                <div className={styles.container}>
                    <p className={styles.policyText}>
                        ご希望の日時をカレンダーから選択し、お申し込みください。<br />
                        無理な勧誘は一切行いませんので、どうぞ安心してご体験ください。
                    </p>

                    <BookingCalendar />

                    <div className={styles.contactNote}>
                        <p>
                            掲載中の日程がご都合に合わない場合は、
                            <Link href="/contact" className={styles.contactLink}>お問い合わせフォーム</Link>
                            よりご希望の日時をお知らせください。
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
