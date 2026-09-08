import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from '../courses.module.css';

export const metadata: Metadata = {
    title: 'Bloom コース（アプリ開発） | KuKKA',
    description: 'AIをフル活用し、Web・ネイティブアプリの企画から開発までを実践するBloomコースをご紹介します。',
};

export default function AppDevCoursePage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="Bloom コース"
                subtitle="AI完全解禁。世界を変えるプロダクトを。"
            />

            {/* 対象・概要 */}
            <Section>
                <p className={styles.courseIntro}>
                    実際のアプリケーション開発を手がける実践コースです。
                    スマホアプリ・Webアプリ・デスクトップアプリなど「作りたいもの」を形にします。
                    AIをフルに活用しながら、要件定義から実装・リリースまでを一貫して経験します。
                </p>
                <div className={styles.targetBadgeRow}>
                    <span className={styles.targetBadge}>対象：応用力・開発志向</span>
                    <span className={styles.targetBadge}>AIの使用：フル解禁</span>
                    <span className={styles.targetBadge}>授業時間：90分</span>
                </div>
            </Section>

            {/* コースの特徴 */}
            <Section title="コースの特徴" background="muted">
                <div className={styles.featureGrid}>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>📱</span>
                        <h3>Any Platform</h3>
                        <p>Web、iOS、Android、Desktopなど、作りたいプラットフォームを自分で選んで開発します。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>🚀</span>
                        <h3>Project Based</h3>
                        <p>カリキュラム消化ではなく、自分のプロジェクトを進行します。要件定義・設計・実装・テストまで一人称で担います。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>⚡</span>
                        <h3>Full AI Support</h3>
                        <p>生成AIをコーディングパートナーとして最大限活用。ただし「何を作るか・なぜそう設計するか」は自分で考えます。</p>
                    </Card>
                </div>
            </Section>

            {/* 学習内容 */}
            <Section title="実際に作るもの・学ぶこと">
                <div className={styles.curriculumGrid}>
                    <div className={styles.curriculumItem}>
                        <h4>🌐 Webアプリ開発</h4>
                        <p>HTML/CSS/JavaScriptの基礎からReactなどのフレームワークまで。実際に公開できるWebサービスを制作します。</p>
                    </div>
                    <div className={styles.curriculumItem}>
                        <h4>📱 スマホアプリ開発</h4>
                        <p>SwiftUI（iOS）やFlutterなど、作りたいものに合わせて技術を選定。AppStoreへのリリースも視野に入れます。</p>
                    </div>
                    <div className={styles.curriculumItem}>
                        <h4>🏗️ 要件定義・設計</h4>
                        <p>「何を・誰のために・なぜ作るか」を言語化するPM的な視点も養います。AIへの指示も設計力が土台になります。</p>
                    </div>
                    <div className={styles.curriculumItem}>
                        <h4>🤖 AIとの高度な協働</h4>
                        <p>CodingAgent等を使いこなし、開発速度を劇的に高める体験をします。AIを使う判断・使わない判断の両方を磨きます。</p>
                    </div>
                </div>
            </Section>

            {/* 成長ロードマップ */}
            <Section title="成長のロードマップ" background="muted">
                <div className={styles.roadmapGrid}>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜3ヶ月</span>
                        <h4>プロジェクト始動</h4>
                        <p>作りたいアプリの要件を定義し、技術選定・環境構築・最初のリリースを経験します。</p>
                    </div>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜6ヶ月</span>
                        <h4>機能を積み上げる</h4>
                        <p>フィードバックをもとに改善・機能追加を繰り返します。AIとの協働で開発サイクルが加速します。</p>
                    </div>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜1年</span>
                        <h4>プロダクトとして完成</h4>
                        <p>公開・発表できるレベルの作品を持てます。ポートフォリオとして進路・受験にも活かせます。</p>
                    </div>
                </div>
            </Section>

            {/* スクールからのメッセージ */}
            <Section title="スクールからのメッセージ">
                <div className={styles.messageContainer}>
                    <h3 className={styles.messageHeadline}>
                        AIは使う。でも、考えることは手放さない。
                    </h3>
                    <p className={styles.messageText}>
                        Bloomコースは「AIを使える」ゴールではありません。<br />
                        AIを使いながらも「何を作りたいか」「なぜそう設計するか」を自分の言葉で語れる人を育てます。<br />
                        それがこれからの時代に本当に必要な力だと、KuKKAは信じています。
                    </p>
                </div>
            </Section>

            {/* 料金・CTA */}
            <Section>
                <div className={styles.ctaContainer}>
                    <p className={styles.pricingNote}>
                        料金・受講システムの詳細は
                        <Link href="/pricing" className={styles.pricingLink}>料金ページ</Link>
                        をご覧ください。
                    </p>
                    <Link href="/booking" className={styles.ctaButton}>
                        無料体験授業に申し込む
                    </Link>
                </div>
            </Section>
        </div>
    );
}
