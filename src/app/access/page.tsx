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
                    {/* Maebashi ※ダミー住所（公開前に正式住所へ差し替え） */}
                    <Card className={styles.locationCard}>
                        <h3>前橋教室</h3>
                        <p className={styles.address}>〒371-0022 群馬県前橋市千代田町1-2-3 KuKKAビル2F</p>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps?q=36.3907,139.0634&z=16&output=embed"
                                width="100%"
                                height="100%"
                                className={styles.mapFrame}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </Card>

                    {/* Hikari Lab Takasaki ※ダミー住所（公開前に正式住所へ差し替え） */}
                    <Card className={styles.locationCard}>
                        <h3>ヒカリラボ高崎教室</h3>
                        <p className={styles.address}>〒370-0849 群馬県高崎市八島町1-1 ヒカリラボビル3F</p>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps?q=36.3221,139.0035&z=16&output=embed"
                                width="100%"
                                height="100%"
                                className={styles.mapFrame}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
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
