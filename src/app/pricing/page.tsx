import React from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from './pricing.module.css';

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
                    <div className={styles.grid}>
                        <Card className={styles.pricingCard}>
                            <h3>Sprout (旧 Basic) コース</h3>
                            <div className={styles.price}>
                                <span className={styles.amount}>11,000</span>
                                <span className={styles.currency}>円/月（税込）</span>
                            </div>
                            <ul className={styles.features}>
                                <li>月2回（1回90分）</li>
                                <li>少人数制サポート</li>
                                <li>振替制度あり</li>
                            </ul>
                        </Card>

                        <Card className={styles.pricingCard}>
                            <h3>Grow (旧 TextCoding) コース</h3>
                            <div className={styles.price}>
                                <span className={styles.amount}>13,200</span>
                                <span className={styles.currency}>円/月（税込）</span>
                            </div>
                            <ul className={styles.features}>
                                <li>月2回（1回90分）</li>
                                <li>少人数制サポート</li>
                                <li>振替制度あり</li>
                            </ul>
                        </Card>

                        <Card className={styles.pricingCard}>
                            <h3>Bloom (旧 Application Dev) コース</h3>
                            <div className={styles.price}>
                                <span className={styles.amount}>16,500</span>
                                <span className={styles.currency}>円/月（税込）</span>
                            </div>
                            <ul className={styles.features}>
                                <li>月2回（1回90分）</li>
                                <li>個別プロジェクトメンター</li>
                                <li>振替制度あり</li>
                            </ul>
                        </Card>
                    </div>
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
                            <span className={styles.infoValue}>なし（一部市販の参考書を使用する場合は実費）</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>PCレンタル</span>
                            <span className={styles.infoValue}>2,200円/月（お持ち込みの場合は無料です）</span>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
