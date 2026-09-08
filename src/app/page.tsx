import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/db';
import styles from './home.module.css';

// 管理画面（別アプリ）での記事公開・更新をビルドなしで即座に反映するため、静的プリレンダリングを無効化する
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'KuKKA - Fun and Growth | AI時代のプログラミングスクール',
    description: 'AIがある時代だからこそ、自分の頭で考えられる子に育ってほしい。群馬のプログラミング教室KuKKAが、Sprout・Grow・Bloomの3段階で「思考の筋力」と「AI活用力」を育みます。',
};

export default async function Home() {
  const latestArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: { slug: true, title: true, summary: true, category: true, publishedAt: true },
  });

  return (
    <div className={styles.page}>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Think. And enjoy it.<br />
            考えることが、好きになる場所。
          </h1>
          <p className={styles.heroSubtitle}>
            AIがある時代だからこそ、<br />
            自分の頭で考えられる子に育ってほしい。
          </p>
        </div>
        <div className={styles.heroBackground} />
      </section>

      {/* 2. Empathy with Anxiety Section */}
      <Section background="muted" className={styles.empathySection}>
        <div className={styles.narrowContainer}>
          <h2 className={styles.storyTitle}>AI時代、子どもはどうなるのか？</h2>
          <div className={styles.storyText}>
            <p>
              子どもがわからない問題をAIに聞いて、<br />
              すぐに答えを出してもらっている。<br />
              そんな場面を見て、少し考えたことはありませんか。
            </p>
            <p>
              便利な時代だからこそ、<br />
              自分で考える経験を、大切にしてあげたい。
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Declaration of Philosophy / Concept */}
      <Section>
        <div className={styles.narrowContainer}>
          <h2 className={styles.storyTitle}>便利だからこそ、あえて制限する</h2>
          <div className={styles.storyText}>
            <p>
              私たちは、学習のはじめの時期は、あえてAIを使いません。<br />
              エラーが出たら、自分で考える。<br />
              うまくいかなくても、もう一度試してみる。<br />
              その地道な繰り返しの中に、本当の力が育つと信じているからです。
            </p>
            <p>
              土台ができたら、少しずつAIを取り入れていく。<br />
              自分で考える力があってこそ、AIは本当の意味で使いこなせる。<br />
              それが、私たちの考える「AIとの向き合い方」です。
            </p>
          </div>
        </div>
      </Section>

      {/* 4. Reassurance Phrase */}
      <section className={styles.reassuranceSection}>
        <div className={styles.reassuranceOverlay} />
        <div className={styles.reassuranceContent}>
          <p className={styles.reassuranceText}>楽しく、丁寧に、一人ひとりに合わせて。</p>
          <div className={styles.reassuranceBody}>
            <p>
              子どもの「わかった！」のタイミングは、みんな違います。<br />
              急かさない。比べない。その子のペースで、一緒に考える。
            </p>
            <p>
              「うちの子についていけるかな」という心配は、よく聞きます。<br />
              進み方も、目標も、その子に合わせてつくりますので、ご安心ください。
            </p>
          </div>
        </div>
      </section>

      {/* 5. Courses (Strategic Restriction to AI Integration) */}
      <Section background="muted">
        <h2 className={styles.centerTitle}>自走力を育む、3つのステップ</h2>
        <div className={styles.grid3}>
          <Link href="/courses/basic" className={styles.courseCardLink}>
            <Card hoverEffect glass className={styles.courseCard}>
              <h3>1. Sprout / 芽吹く</h3>
              <p className={styles.courseSubtitle}>思考力の育成</p>
              <p className={styles.courseDesc}>
                使うツールはScratchやMinecraft。<br />
                難しい構文も、複雑な数式も、まだ必要ありません。<br /><br />
                大切なのは、自分の頭で考えること。<br />
                うまくいかなくて当然。また試せばいい。<br />
                その小さな繰り返しの中で、考える力の芽が、静かに育ちはじめます。
              </p>
            </Card>
          </Link>

          <Link href="/courses/text-coding" className={styles.courseCardLink}>
            <Card hoverEffect glass className={styles.courseCard}>
              <h3>2. Grow / 育てる</h3>
              <p className={styles.courseSubtitle}>AIとの段階的接続</p>
              <p className={styles.courseDesc}>
                使うツールはPythonやJavaScript。<br />
                ここから、本格的なコードと向き合います。<br /><br />
                Sproutで育てた「自分で考える力」を土台に、<br />
                少しずつAIを取り入れていく段階です。<br />
                AIに頼るのではなく、AIと一緒に考える。<br />
                その感覚を、じっくり身につけていきます。
              </p>
            </Card>
          </Link>

          <Link href="/courses/app-dev" className={styles.courseCardLink}>
            <Card hoverEffect glass className={styles.courseCard}>
              <h3>3. Bloom / 咲かせる</h3>
              <p className={styles.courseSubtitle}>実社会的開発体験</p>
              <p className={styles.courseDesc}>
                作るのは、本物のアプリケーション。<br />
                WebアプリでもスマホアプリでもDesktopアプリでも、<br />
                作りたいものを、作りたい形で。<br /><br />
                AIをフルに活用していいのが、このステージです。<br />
                でもそれができるのは、自分で考える力が育っているから。<br />
                Sproutから積み上げてきたものが、ここで花を咲かせます。
              </p>
            </Card>
          </Link>
        </div>
      </Section>

      {/* 6. Success Cases (Evidence) */}
      <Section>
        <h2 className={styles.centerTitle}>確かな成長の軌跡</h2>
        <div className={styles.grid2}>
          <div className={styles.storyText}>
            <p>
              子どもたちは、私たちの想像をいつも超えていきます。
            </p>
            <p>
              プログラムがうまく動かなくても、諦めずに取り組み続けた小学生がいました。<br />
              そしてある日、似たような問題に出会った瞬間、<br />
              自分でスッと解決してしまった。<br />
              その瞬間を見られたことが、私たちの喜びです。
            </p>
            <p>
              企画から開発まで、自分の力だけで<br />
              オリジナルアプリを作り上げようとしている中学生がいる。
            </p>
            <p>
              考える力は、静かに、でも確かに育っていきます。
            </p>
            {/* TODO: Add link to actual success cases page later if needed */}
            <p className={styles.storyCtaLink}>
              <Link href="/column" className={styles.inlineLink}>
                プロジェクト事例をもっと見る &rarr;
              </Link>
            </p>
          </div>
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>Success Case / Project Photos</span>
          </div>
        </div>
      </Section>

      {/* 7. Column Preview */}
      {latestArticles.length > 0 && (
        <Section background="muted">
          <h2 className={styles.centerTitle}>KuKKAの視点 (Column)</h2>
          <div className={styles.columnGrid}>
            {latestArticles.map((article) => (
              <Link key={article.slug} href={`/column/${article.slug}`} className={styles.columnCardLink}>
                <Card>
                  <div className={styles.columnCard}>
                    {article.publishedAt && (
                      <p className={styles.columnDate}>
                        {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                      </p>
                    )}
                    {article.category && (
                      <p className={styles.columnCategory}>{article.category}</p>
                    )}
                    <h3 className={styles.columnTitle}>{article.title}</h3>
                    <p className={styles.columnSummary}>{article.summary}</p>
                    <span className={styles.columnReadMore}>続きを読む →</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className={styles.columnCtaWrapper}>
            <Link href="/column">
              <Button variant="outline">すべての記事を読む</Button>
            </Link>
          </div>
        </Section>
      )}

      {/* 8. Quiet Invitation (Booking CTA) */}
      <section className={styles.invitationSection}>
        <div className={styles.narrowContainer}>
          <h2 className={styles.invitationTitle}>共感の果ての、招待</h2>
          <p className={styles.invitationText}>
            ここまでお読みいただき、ありがとうございます。<br />
            もし私たちの考え方に、少しでも共感していただけたなら、<br />
            ぜひ一度、教室へ遊びにいらしてください。<br /><br />
            お子様の未来について、一緒にお話しできることを楽しみにしています。
          </p>
          <div className={styles.invitationAction}>
            <Link href="/booking">
              <Button size="lg" variant="primary">体験レッスンに申し込む</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sub-page Links for Reassurance (Optional quick access) */}
      <section className={styles.practicalLinksSection}>
        <div className={styles.practicalLinksGrid}>
          <Link href="/pricing" className={styles.practicalLink}>料金とシステム &rarr;</Link>
          <Link href="/faq" className={styles.practicalLink}>よくある質問と振替 &rarr;</Link>
          <Link href="/access" className={styles.practicalLink}>教室へのアクセス &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
