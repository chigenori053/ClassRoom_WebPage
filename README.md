# KuKKA Webページ

プログラミング教室KuKKAの公開サイトと管理画面。詳しいプロジェクト方針・コーディング規約は [CLAUDE.md](CLAUDE.md) を参照。

## 構成

このリポジトリには独立した2つのNext.jsアプリが含まれる。

- **公開サイト**（リポジトリルート、ポート3000）: トップ・コース紹介・料金・FAQ・アクセス・体験予約・コラム・お問い合わせ
- **管理画面**（`admin/`、ポート3001）: 予約管理・スケジュール管理（Googleカレンダー連携）・お問い合わせ管理・コラム記事の執筆/公開

両アプリは同じPostgreSQLデータベースを参照する（それぞれ独自のPrisma schema・migrationsを持つ）。

## セットアップ

```bash
npm install
cd admin && npm install
```

環境変数は `.env.example` / `admin/.env.example` を参照し、それぞれ `.env.local` としてコピー・設定する。

```bash
cp .env.example .env.local
cp admin/.env.example admin/.env.local
```

Prismaのマイグレーションを適用する（公開サイト・管理画面それぞれ）。

```bash
npx prisma migrate deploy
cd admin && npm run db:migrate
```

## 開発サーバー

```bash
npm run dev          # 公開サイト（http://localhost:3000）
npm run dev:admin    # 管理画面（http://localhost:3001）
```

## ビルド

```bash
npm run build         # 公開サイト
npm run build:admin   # 管理画面
```

## Lint

```bash
npm run lint
```
