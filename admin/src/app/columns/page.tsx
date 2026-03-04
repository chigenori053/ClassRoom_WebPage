import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { publishArticle, unpublishArticle } from './actions';
import { DeleteButton } from './DeleteButton';
import styles from './columns.module.css';

export default async function AdminColumnsPage() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.listPage}>
      <div className={styles.listHeader}>
        <h1 className={styles.listTitle}>コラム管理</h1>
        <div className={styles.headerActions}>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← ダッシュボードへ</Button>
          </Link>
          <Link href="/columns/new">
            <Button variant="primary" size="sm">新規作成</Button>
          </Link>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className={styles.emptyState}>
          <p>まだ記事がありません。</p>
        </div>
      ) : (
        <table className={styles.articleTable}>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>タイトル / slug</th>
              <th>カテゴリ</th>
              <th>ステータス</th>
              <th>公開日</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <div className={styles.articleTitle}>{article.title}</div>
                  <div className={styles.articleSlug}>/column/{article.slug}</div>
                </td>
                <td>{article.category || '—'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles['status' + article.status]}`}>
                    {article.status === 'PUBLISHED' ? '公開中' : '下書き'}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString('ja-JP')
                    : '—'}
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <Link href={`/columns/${article.id}/edit`}>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`}>編集</button>
                    </Link>
                    {article.status === 'DRAFT' ? (
                      <form action={publishArticle.bind(null, article.id)}>
                        <button type="submit" className={`${styles.actionBtn} ${styles.publishBtn}`}>公開</button>
                      </form>
                    ) : (
                      <form action={unpublishArticle.bind(null, article.id)}>
                        <button type="submit" className={`${styles.actionBtn} ${styles.unpublishBtn}`}>下書きに戻す</button>
                      </form>
                    )}
                    <DeleteButton articleId={article.id} title={article.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
