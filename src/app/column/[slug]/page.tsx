import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { prisma } from '@/lib/db';
import { Section } from '@/components/ui/Section';
import styles from '../column.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// 管理画面（別アプリ）での記事公開・更新をビルドなしで即座に反映するため、静的プリレンダリングを無効化する
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return {
    title: `${article.title} | KuKKA COLUMN`,
    description: article.metaDesc || article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED' },
  });

  if (!article) notFound();

  return (
    <div>
      <Section>
        <article className={styles.articlePage}>
          <Link href="/column" className={styles.backLink}>
            ← コラム一覧へ
          </Link>

          <header className={styles.articleHeader}>
            <div className={styles.articleMeta}>
              {article.category && (
                <span className={styles.articleCategory}>{article.category}</span>
              )}
              {article.publishedAt && (
                <span className={styles.articleDate}>
                  {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              )}
            </div>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            {article.tags && (
              <div className={styles.articleTags}>
                {article.tags.split(',').map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </header>

          {article.thumbnail && (
            <Image
              src={article.thumbnail}
              alt={article.title}
              width={720}
              height={405}
              className={styles.articleThumbnail}
              priority
            />
          )}

          <div className={styles.markdown}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.body}
            </ReactMarkdown>
          </div>
        </article>
      </Section>
    </div>
  );
}
