export function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  const base = title
    .toLowerCase()
    .replace(/[\u3000-\u9fff\uac00-\ud7af]/g, '') // CJK文字を除去
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40);

  return base ? `${base}-${timestamp}` : timestamp;
}
