import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import styles from './column.module.css';

export const metadata: Metadata = {
  title: 'COLUMN | KuKKA',
  description: 'KuKKAの教育観・日々の気づきをコラムでお届けします。',
};

// 管理画面（別アプリ）での記事公開・更新をビルドなしで即座に反映するため、静的プリレンダリングを無効化する
export const dynamic = 'force-dynamic';

export default async function ColumnPage() {
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div>
      <PageHeader title="COLUMN" subtitle="KuKKAの視点" />
      <Section>
        {articles.length === 0 ? (
          <div className={styles.emptyState}>
            <p>コラムを準備中です。しばらくお待ちください。</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <Link key={article.id} href={`/column/${article.slug}`} className={styles.card}>
                {article.thumbnail ? (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    width={600}
                    height={338}
                    className={styles.thumbnail}
                  />
                ) : (
                  <div className={styles.thumbnailPlaceholder} aria-hidden="true">
                    KuKKA COLUMN
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    {article.category && (
                      <span className={styles.category}>{article.category}</span>
                    )}
                    {article.publishedAt && (
                      <span className={styles.date}>
                        {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                      </span>
                    )}
                  </div>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.summary}>{article.summary}</p>
                  {article.tags && (
                    <div className={styles.tags}>
                      {article.tags.split(',').map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className={styles.readMore}>続きを読む →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
