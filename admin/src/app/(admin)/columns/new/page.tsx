import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { createArticle } from '../actions';
import styles from '../columns.module.css';

export default async function NewArticlePage() {
  return (
    <div className={styles.formPage}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>新規コラム作成</h1>
        <Link href="/columns">
          <Button variant="ghost" size="sm">← 一覧へ戻る</Button>
        </Link>
      </div>

      <form action={createArticle} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="title">
            タイトル<span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={styles.input}
            placeholder="記事のタイトルを入力"
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
              placeholder="空欄で自動生成"
              pattern="[a-z0-9-]*"
            />
            <span className={styles.formHint}>半角英数字とハイフンのみ。例: ai-to-kodomo</span>
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
              placeholder="例: 教育コラム"
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
            placeholder="例: AI, プログラミング, 思考力"
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
            placeholder="一覧ページに表示される短い要約（100〜150文字程度）"
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
            placeholder="# 見出し&#10;&#10;本文をMarkdown形式で入力してください。"
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
            placeholder="例: /images/column/article-01.jpg"
          />
          <span className={styles.formHint}>画像は /public/images/ に配置してください</span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="metaDesc">
            SEOメタディスクリプション
          </label>
          <textarea
            id="metaDesc"
            name="metaDesc"
            className={styles.textarea}
            placeholder="検索結果に表示される説明文（120文字以内推奨）"
            rows={2}
          />
        </div>

        <div className={styles.formActions}>
          <Link href="/columns">
            <Button type="button" variant="ghost">キャンセル</Button>
          </Link>
          <Button type="submit" variant="secondary">下書き保存</Button>
        </div>
      </form>
    </div>
  );
}
