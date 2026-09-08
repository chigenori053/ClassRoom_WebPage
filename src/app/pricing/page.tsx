import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { PricingTable } from '@/components/courses/PricingTable';
import styles from './pricing.module.css';

export const metadata: Metadata = {
    title: '料金とシステム | KuKKA',
    description: 'KuKKAプログラミング教室の月謝・受講頻度・時間帯プランをコースごとにご案内します。',
};

const pricingPlans = [
    {
        duration: 'Sprout コース',
        description: '',
        subGroups: [
            {
                label: '週1回',
                plans: [
                    { frequency: '各90分', monthlyPrice: '13,000' },
                    { frequency: '各60分', monthlyPrice: '8,000' },
                ],
            },
            {
                label: '隔週2回',
                plans: [
                    { frequency: '各90分', monthlyPrice: '8,000' },
                    { frequency: '各60分', monthlyPrice: '5,000' },
                ],
            },
        ],
    },
    {
        duration: 'Grow コース',
        description: '',
        plans: [
            { frequency: '週1回', monthlyPrice: '13,000', timePerSession: '90分/回' },
            { frequency: '隔週2回', monthlyPrice: '9,000', timePerSession: '90分/回' },
        ],
    },
    {
        duration: 'Bloom コース',
        description: '',
        plans: [
            { frequency: '週1回', monthlyPrice: '18,000', timePerSession: '90分/回' },
            { frequency: '隔週2回', monthlyPrice: '9,000', timePerSession: '90分/回' },
        ],
    },
];

export default function PricingPage() {
    return (
        <div className={styles.page}>
            <Section className={styles.headerSection}>
                <h1 className={styles.title}>料金とシステム</h1>
                <p className={styles.subtitle}>
                    KuKKAでは、入会金無料・月謝制のわかりやすいシステムを採用しています。<br />
                    パソコンのレンタルもご用意していますので、手ぶらでスタートできます。
                </p>
            </Section>

            <Section background="muted">
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>コース別料金</h2>
                    <PricingTable plans={pricingPlans} />
                </div>
            </Section>

            <Section>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>その他の費用</h2>
                    <div className={styles.infoBox}>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>入会金</span>
                            <span className={styles.infoValue}>無料（いつでもお気軽にお試しいただけるように）</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>教材費</span>
                            <span className={styles.infoValue}>なし（一部市販の参考書を使用する場合は別途ご相談）</span>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
