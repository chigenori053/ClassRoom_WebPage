import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { LearningCard } from '@/components/courses/LearningCard';
import styles from '../courses.module.css';

export const metadata: Metadata = {
    title: 'Sprout コース（Scratch・マイクラ） | KuKKA',
    description: 'AIを使わず、Scratchやマインクラフトで「自分で考える力」の土台を育むSproutコースをご紹介します。',
};

export default function BasicCoursePage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="Sprout コース"
                subtitle="「遊び」を「学び」に変え、論理の基礎を築く"
            />

            {/* 対象・概要 */}
            <Section>
                <p className={styles.courseIntro}>
                    プログラミングに初めて触れるお子様向けのコースです。好きなツールを入口に、
                    「考えること」の楽しさを体験しながら、論理的思考の土台を育てます。
                    このコースではAIを使わず、自分の頭だけで試行錯誤することを大切にしています。
                </p>
                <div className={styles.targetBadgeRow}>
                    <span className={styles.targetBadge}>対象：小学生・初学者</span>
                    <span className={styles.targetBadge}>AIの使用：なし</span>
                    <span className={styles.targetBadge}>授業時間：60分 or 90分</span>
                </div>
            </Section>

            {/* 学習コンテンツ */}
            <Section title="興味で選べる3つの学習コンテンツ" background="muted">
                <div className={styles.learningGrid}>
                    <LearningCard
                        layout="left"
                        emoji="🧩"
                        title="Scratch"
                        titleJa="（スクラッチ）"
                        imageSrc="/images/courses/scratch-learning.png"
                        imageAlt="Scratch Programming"
                        description="ブロックを組み合わせてオリジナルゲームを開発。自由な発想を形にする力を養います。"
                        fitFor={[
                            'ゲームやアニメが好きな子',
                            '絵を描くのが好きな子',
                            '視覚的に結果が見えると嬉しい子',
                            'パソコンが初めての子',
                        ]}
                        themes={[
                            'キャラクターが動くアニメーション',
                            'スコアや難易度のあるミニゲーム',
                            '物語ゲーム・クイズアプリ',
                        ]}
                    />

                    <LearningCard
                        layout="right"
                        emoji="🧱"
                        title="Minecraft Education"
                        titleJa="（マイクラ）"
                        imageSrc="/images/courses/minecraft-edu.png"
                        imageAlt="Minecraft Education Edition"
                        description="マイクラの世界を舞台に、プログラミングやコマンド、レッドストーン回路を駆使して複雑な仕掛け制作に挑戦します。"
                        fitFor={[
                            'マイクラが好きな子',
                            '建築や仕掛けが好きな子',
                            '空間把握が得意な子',
                            'ゲームをきっかけに学びたい子',
                        ]}
                        themes={[
                            'コマンドブロックで建物を自動生成',
                            'レッドストーン回路で複雑な装置',
                            'MakeCodeでプログラムを書く',
                        ]}
                    />

                    <LearningCard
                        layout="left"
                        emoji="💻"
                        title="Swift Playgrounds"
                        titleJa="（ステップアップ向け）"
                        imageSrc="/images/courses/swift-playgrounds.png"
                        imageAlt="Swift Playgrounds"
                        description="基礎が身についたら、本格的なテキストコーディングの準備として、Appleの学習環境で構文を学びます。"
                        fitFor={[
                            'ScratchやMinecraftで基礎が身についた子',
                            'テキストコードに挑戦したい子',
                            'iPhoneアプリに興味がある子',
                        ]}
                        themes={[
                            'Appleの学習パズルをクリア',
                            '変数・関数・条件分岐の習得',
                            'Growコースへの橋渡し',
                        ]}
                    />
                </div>
            </Section>

            {/* 授業の流れ */}
            <Section title="1コマの授業の流れ">
                <div className={styles.flowList}>
                    <div className={styles.flowItem}>
                        <span className={styles.flowStep}>01</span>
                        <div>
                            <h4>振り返り・テーマ確認（10分）</h4>
                            <p>前回の続きを思い出し、今日取り組む課題を講師と一緒に確認します。</p>
                        </div>
                    </div>
                    <div className={styles.flowItem}>
                        <span className={styles.flowStep}>02</span>
                        <div>
                            <h4>制作・試行錯誤（50〜70分）</h4>
                            <p>自分のペースで手を動かします。詰まったときは「どう考えたか」を整理するところから。答えをすぐに教えません。</p>
                        </div>
                    </div>
                    <div className={styles.flowItem}>
                        <span className={styles.flowStep}>03</span>
                        <div>
                            <h4>発表・振り返り（10〜20分）</h4>
                            <p>今日できたこと・わかったことを言語化します。「うまくいかなかった理由」を自分で説明できることが成長の証です。</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 成長ロードマップ */}
            <Section title="成長のロードマップ" background="muted">
                <div className={styles.roadmapGrid}>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜3ヶ月</span>
                        <h4>基礎体験</h4>
                        <p>ツールの操作に慣れ、簡単なアニメーションやゲームを完成させる。「できた！」という達成感を積み重ねます。</p>
                    </div>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜6ヶ月</span>
                        <h4>論理構成力</h4>
                        <p>条件分岐・繰り返しなどの概念を自然に使いこなせるように。エラーを自力で読んで修正できるようになります。</p>
                    </div>
                    <div className={styles.roadmapCard}>
                        <span className={styles.roadmapPeriod}>〜1年</span>
                        <h4>自走力</h4>
                        <p>「作りたいものを、自分で設計して作る」流れが身につきます。次のコース（Grow）への準備が整います。</p>
                    </div>
                </div>
            </Section>

            {/* スクールからのメッセージ */}
            <Section title="スクールからのメッセージ">
                <div className={styles.messageContainer}>
                    <h3 className={styles.messageHeadline}>
                        「正解」を教えるのではなく、「考え方」を育む。
                    </h3>
                    <p className={styles.messageText}>
                        最初はマウスの持ち方から。パソコンに触れるのが初めてでも大丈夫です。<br />
                        一人ひとりの進度に合わせて講師がサポートするため、置いてきぼりになりません。<br />
                        「わからない」を「おもしろい」に変える瞬間を、一緒に見つけていきましょう。
                    </p>
                </div>
            </Section>

            {/* 次のコース */}
            <Section background="muted">
                <div className={styles.nextCourseBox}>
                    <p className={styles.nextCourseLabel}>NEXT STEP</p>
                    <h3>自走力がついたら、Grow コースへ</h3>
                    <p>テキストコーディング（Python）とAI活用を学ぶ次のステージへ。進級のタイミングは講師と一緒に判断します。</p>
                    <Link href="/courses/text-coding" className={styles.nextCourseLink}>Grow コースを見る →</Link>
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
