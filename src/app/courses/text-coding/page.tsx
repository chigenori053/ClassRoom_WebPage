import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from '../courses.module.css';

export const metadata: Metadata = {
    title: 'Grow コース（Python・JavaScript） | KuKKA',
    description: 'Python・JavaScriptによる本格的なコーディングに、AIを一部解禁しながら取り組むGrowコースをご紹介します。',
};

export default function TextCodingCoursePage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="Grow コース"
                subtitle="AIを相棒に、本物のコードで世界を解き明かす"
            />

            {/* 対象・概要 */}
            <Section>
                <p className={styles.courseIntro}>
                    ブロックプログラミングを卒業し、PythonやJavaScriptを用いた「実践的な開発」へ進むコースです。
                    AIを部分的に解禁し、「自分で考えてから、AIに聞く」という本物のエンジニア思考を身につけます。
                </p>
                <div className={styles.targetBadgeRow}>
                    <span className={styles.targetBadge}>対象：中学生〜・基礎習得者</span>
                    <span className={styles.targetBadge}>AIの使用：補助的に解禁</span>
                    <span className={styles.targetBadge}>授業時間：90分</span>
                </div>
            </Section>

            {/* 学習サイクル */}
            <Section title="KuKKA流・自走型学習サイクル" background="muted">
                <div className={styles.featureGrid}>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>🤔</span>
                        <h3>思考（Logic First）</h3>
                        <p>まずは自力で解決策を考え、プログラムの構成を組み立てます。AIに頼る前に「自分ならどうするか」を問います。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>💻</span>
                        <h3>実装（Coding）</h3>
                        <p>Pythonなどでコードを書き、シミュレーションやゲームを形にします。エラーも自分で読んで向き合います。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>🚀</span>
                        <h3>深化（AI Support）</h3>
                        <p>知識の補完やエラーの解説に生成AI（ChatGPT/Gemini）を活用。「AIへの問い方」自体を学びます。</p>
                    </Card>
                </div>
            </Section>

            {/* 学習内容 */}
            <Section title="実際に作るもの・学ぶこと">
                <div className={styles.curriculumGrid}>
                    <div className={styles.curriculumItem}>
                        <h4>🐍 Python 基礎〜応用</h4>
                        <p>変数・条件分岐・繰り返し・関数・クラスといった本格的な概念を、実際に動くプログラムを作りながら習得します。</p>
                    </div>
                    <div className={styles.curriculumItem}>
                        <h4>📊 データとシミュレーション</h4>
                        <p>円周率の計算、素数の探索、簡単な統計など。数学と組み合わせることで、プログラミングの応用範囲を体感します。</p>
                    </div>
                    <div className={styles.curriculumItem}>
                        <h4>🎮 ゲーム制作（pygame）</h4>
                        <p>キャラクターが動くゲームを自分で設計・実装。ロジックを自分でゼロから組み立てる経験を積みます。</p>
                    </div>
                    <div className={styles.curriculumItem}>
                        <h4>🤖 AIとの協働</h4>
                        <p>ChatGPT/GeminiなどのAIを「答えを聞く道具」ではなく、「自分の思考を補強する相談相手」として使う訓練をします。</p>
                    </div>
                </div>
            </Section>

            {/* 成長ロードマップ */}
            <Section title="成長のロードマップ" background="muted">
                <div className={styles.roadmapGrid}>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜3ヶ月</span>
                        <h4>テキストコードに慣れる</h4>
                        <p>構文エラーを自力で読めるように。「ブロックがない」不安が「自由に書ける」楽しさに変わります。</p>
                    </div>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜6ヶ月</span>
                        <h4>設計力がつく</h4>
                        <p>コードを書く前に「どう構成するか」を考えられるように。AIを補助的に使いながら複雑な処理を実装できます。</p>
                    </div>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜1年</span>
                        <h4>AIと協働できる</h4>
                        <p>自分の意図を明確に言語化し、AIに適切な指示を出せるように。次のコース（Bloom）への準備が整います。</p>
                    </div>
                </div>
            </Section>

            {/* FAQ */}
            <Section title="よくあるご質問">
                <div className={styles.faqList}>
                    <Card className={styles.faqCard}>
                        <h4>Q. 生成AIを授業で使うと、考える力が落ちませんか？</h4>
                        <p>A. むしろ逆です。KuKKAでは「最初に自分で構成を考える」プロセスを最重視しています。AIは答えを丸写しするためではなく、新しい知識の解説を聞いたり、自分のロジックを補強する「家庭教師」として活用します。AIへの適切な「問い方」を学ぶことは、これからの時代に最も必要な論理的思考力を育てます。</p>
                    </Card>
                    <Card className={styles.faqCard}>
                        <h4>Q. なぜGrowコースには60分プランがないのですか？</h4>
                        <p>A. テキストコーディングやAIを使った深い探究には、「構成→実装→検証（AIとの対話）」という一連のサイクルが必要です。このプロセスを妥協せず、高い達成感を得るためには90分が最適であると判断し、専門コースとして設定しています。</p>
                    </Card>
                    <Card className={styles.faqCard}>
                        <h4>Q. 文系（数学が苦手）な子供でも大丈夫ですか？</h4>
                        <p>A. はい。例えば円周率（π）の算出シミュレーションなど、数式だけでは理解しにくい概念も、プログラミングで「視覚化」することで直感的に理解できるようになります。AIのサポートを受けながら自分のペースで進められるので、数学への興味が湧くきっかけにもなります。</p>
                    </Card>
                </div>
            </Section>

            {/* 次のコース */}
            <Section background="muted">
                <div className={styles.nextCourseBox}>
                    <p className={styles.nextCourseLabel}>NEXT STEP</p>
                    <h3>AIを使いこなせたら、Bloom コースへ</h3>
                    <p>実際のアプリケーション開発を手がける最終ステージへ。進級のタイミングは講師と一緒に判断します。</p>
                    <Link href="/courses/app-dev" className={styles.nextCourseLink}>Bloom コースを見る →</Link>
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
