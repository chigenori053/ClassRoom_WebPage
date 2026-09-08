import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from './access.module.css';

export const metadata: Metadata = {
    title: '教室へのアクセス | KuKKA',
    description: 'KuKKAプログラミング教室の各教室の所在地・地図をご案内します。',
};

export default function AccessPage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="ACCESS"
                subtitle="教室へのアクセス"
            />

            <Section>
                <div className={styles.locations}>
                    {/* 正式な住所が確定するまでは、実在するかのような住所・地図を表示しない */}
                    <Card className={styles.locationCard}>
                        <h3>前橋教室</h3>
                        <p className={styles.mutedText}>住所は準備中です。詳細はお問い合わせください。</p>
                    </Card>

                    <Card className={styles.locationCard}>
                        <h3>ヒカリラボ高崎教室</h3>
                        <p className={styles.mutedText}>住所は準備中です。詳細はお問い合わせください。</p>
                    </Card>
                </div>

                <div className={styles.bottomNote}>
                    <h3>桐生サテライト教室</h3>
                    <p className={styles.mutedText}>（詳細はお問い合わせください）</p>
                </div>
            </Section>
        </div>
    );
}
