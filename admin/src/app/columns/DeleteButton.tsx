'use client';

import { deleteArticle } from './actions';
import styles from './columns.module.css';

interface Props {
  articleId: number;
  title: string;
}

export function DeleteButton({ articleId, title }: Props) {
  async function handleDelete() {
    if (!confirm(`「${title}」を削除しますか？この操作は取り消せません。`)) return;
    await deleteArticle(articleId);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className={`${styles.actionBtn} ${styles.deleteBtn}`}
      aria-label={`${title}を削除`}
    >
      削除
    </button>
  );
}
