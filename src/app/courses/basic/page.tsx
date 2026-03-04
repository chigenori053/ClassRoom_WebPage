import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PricingTable } from '@/components/courses/PricingTable';
import styles from '../courses.module.css';

export default function BasicCoursePage() {
    const pricingPlans = [
        {
            duration: 'Sprout (旧 Basic) コース',
            description: '月2回 各90分 / 少人数制サポート / 振替あり',
            plans: [
                { frequency: '月2回', monthlyPrice: '11,000', timePerSession: '90分/回' },
            ],
        },
    ];

    return (
        <div className={styles.page}>
            <PageHeader
                title="Sprout (旧 Basic) コース"
                subtitle="「遊び」を「学び」に変え、論理の基礎を築く"
            />

            {/* 学習コンテンツセクション */}
            <Section title="興味で選べる3つの学習コンテンツ">
                <p className="text-center max-w-3xl mx-auto mb-12" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.85)' }}>
                    プログラミングの基礎を、お子様が大好きなツールを通じて楽しく学びます。
                </p>
                <div className={styles.learningGrid}>
                    <Card glass hoverEffect className={styles.learningCard}>
                        <div className={styles.learningImage}>
                            <Image
                                src="/images/courses/scratch-learning.png"
                                alt="Scratch Programming"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '12px' }}
                            />
                        </div>
                        <h3 className={styles.learningTitle}>🧩 Scratch<span className={styles.titleJa}>（スクラッチ）</span></h3>
                        <div className={styles.learningContent}>
                            <p>ブロックを組み合わせてオリジナルゲームを開発。自由な発想を形にする力を養います。</p>
                        </div>
                    </Card>

                    <Card glass hoverEffect className={styles.learningCard}>
                        <div className={styles.learningImage}>
                            <Image
                                src="/images/courses/minecraft-edu.png"
                                alt="Minecraft Education Edition"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '12px' }}
                            />
                        </div>
                        <h3 className={styles.learningTitle}>🧱 Minecraft Education<span className={styles.titleJa}>（マイクラ）</span></h3>
                        <div className={styles.learningContent}>
                            <p>マイクラの世界を舞台に、プログラミングやコマンド、レッドストーン回路を駆使して複雑な仕掛け制作に挑戦します。</p>
                        </div>
                    </Card>

                    <Card glass hoverEffect className={styles.learningCard}>
                        <div className={styles.learningImage}>
                            <Image
                                src="/images/courses/swift-playgrounds.png"
                                alt="Swift Playgrounds"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '12px' }}
                            />
                        </div>
                        <h3 className={styles.learningTitle}>💻 Swift Playgrounds<span className={styles.titleJa}>（ステップアップ向け）</span></h3>
                        <div className={styles.learningContent}>
                            <p>基礎が身についたら、本格的なテキストコーディングの準備として、Appleの学習環境で構文を学びます。</p>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* 料金プランセクション */}
            <Section title="ライフスタイルで選べる料金プラン">
                <p className="text-center max-w-3xl mx-auto mb-12" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.85)' }}>
                    ご家庭のスケジュールに合わせて「時間」と「頻度」を選べます。
                </p>
                <PricingTable plans={pricingPlans} />
            </Section>

            {/* スクールからのメッセージ */}
            <Section title="スクールからのメッセージ">
                <div className={styles.messageContainer}>
                    <h3 className={styles.messageHeadline}>
                        「正解」を教えるのではなく、「考え方」を育む。
                    </h3>
                    <p className={styles.messageText}>
                        最初はマウスの持ち方から。パソコンに触れるのが初めてでも大丈夫です。<br />
                        一人ひとりの進度に合わせて講師がサポートするため、置いてきぼりになりません。
                    </p>
                </div>
            </Section>

            {/* CTAセクション */}
            <Section>
                <div className={styles.ctaContainer}>
                    <Link href="/contact" className={styles.ctaButton}>
                        無料体験授業に申し込む
                    </Link>
                </div>
            </Section>
        </div>
    );
}
