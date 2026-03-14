import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { updateArticle } from '../../actions';
import styles from '../../columns.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id: Number(id) } });
  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div className={styles.formPage}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>コラム編集</h1>
        <Link href="/columns">
          <Button variant="ghost" size="sm">← 一覧へ戻る</Button>
        </Link>
      </div>

      <form action={updateWithId} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="title">
            タイトル<span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={styles.input}
            defaultValue={article.title}
            required
            aria-required="true"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="slug">
              slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              className={styles.input}
              defaultValue={article.slug}
              pattern="[a-z0-9-]*"
            />
            <span className={styles.formHint}>変更すると既存のURLが変わります</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="category">
              カテゴリ
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className={styles.input}
              defaultValue={article.category ?? ''}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="tags">
            タグ
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            className={styles.input}
            defaultValue={article.tags}
          />
          <span className={styles.formHint}>カンマ区切りで入力</span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="summary">
            要約<span className={styles.required}>*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            className={styles.textarea}
            defaultValue={article.summary}
            rows={3}
            required
            aria-required="true"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="body">
            本文（Markdown）<span className={styles.required}>*</span>
          </label>
          <textarea
            id="body"
            name="body"
            className={`${styles.textarea} ${styles.bodyTextarea}`}
            defaultValue={article.body}
            required
            aria-required="true"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="thumbnail">
            サムネイル画像パス
          </label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="text"
            className={styles.input}
            defaultValue={article.thumbnail ?? ''}
            placeholder="例: /images/column/article-01.jpg"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="metaDesc">
            SEOメタディスクリプション
          </label>
          <textarea
            id="metaDesc"
            name="metaDesc"
            className={styles.textarea}
            defaultValue={article.metaDesc ?? ''}
            rows={2}
          />
        </div>

        <div className={styles.formActions}>
          <Link href="/columns">
            <Button type="button" variant="ghost">キャンセル</Button>
          </Link>
          <Button type="submit" variant="secondary">保存する</Button>
        </div>
      </form>
    </div>
  );
}
