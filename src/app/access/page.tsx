import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from './access.module.css';

export default function AccessPage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="ACCESS"
                subtitle="教室へのアクセス"
            />

            <Section>
                <div className={styles.locations}>
                    {/* Maebashi */}
                    <Card className={styles.locationCard}>
                        <h3>前橋教室</h3>
                        <p className={styles.address}>〒371-0000 群馬県前橋市...</p>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3211.5!2d139.0!3d36.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzAwLjAiTiAxMznCsDAwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
                                width="100%"
                                height="100%"
                                className={styles.mapFrame}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </Card>

                    {/* SO Lab Takasaki */}
                    <Card className={styles.locationCard}>
                        <h3>SOラボ教室 (高崎)</h3>
                        <p className={styles.address}>〒370-0000 群馬県高崎市...</p>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3211.5!2d139.0!3d36.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzAwLjAiTiAxMznCsDAwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
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
