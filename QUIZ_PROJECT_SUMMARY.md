# 📚 IT 系クイズアプリ - 開発ドキュメント（最新版）

## 🚀 プロジェクト概要

IT 系の基礎知識を問う 4 択クイズアプリを Next.js で開発しています。  
個人開発ですが、チーム開発を意識したフロー（ブランチ作成、PR 作成、main マージ）を取り入れています。

- 問題データは `/public/data/questions.json` から動的読み込み
- Google アカウントによるログインを実装
- Gemini API による追加質問機能を搭載
- Supabase を使ったユーザー登録管理と管理者画面の実装済み

## ✨ 現在できている機能

- ホーム画面に「クイズ開始」ボタンを設置
- クイズをランダムに 5 問出題し、正解・不正解判定と表示
- 回答後「次の問題へ」ボタンで進行、全問終了後にスコア表示
- 「もう一度挑戦する」「ホームに戻る」ボタンも実装済み
- AI への自由質問フォーム（Gemini API）＋ ローディング表示
- AnswerResult / QuizResult などを独立コンポーネント化
- クイズ画面のロジックは useQuizGame / useGemini フックに分離
- Google ログイン状態は SessionProvider + ClientHeader で共通管理
- Supabase にログインユーザーを保存（名前、メール、登録日時、最終ログイン）

## 🗂️ ディレクトリ構成（主要ファイル）

/app  
├── layout.js # 全体レイアウト（ヘッダー等含む）  
├── page.js # ホーム画面  
├── /quiz  
│ ├── page.jsx # クイズ進行ページ（useQuizGame 使用）  
│ └── QuizPage.module.css  
├── /admin  
│ ├── page.jsx # 管理者ユーザー一覧ページ（useSession + API）  
│ └── AdminPage.module.css  
├── /api  
│ ├── /generate/route.js # Gemini API 呼び出し（ログイン制限あり）  
│ ├── /admin-users/route.js # Supabase からユーザー一覧取得 API  
│ └── /auth/[...nextauth]/route.js # NextAuth 認証処理

/components  
├── Question.jsx  
├── AnswerResult.jsx  
├── QuizResult.jsx  
├── ClientHeader.jsx  
└── 各種 .module.css

/hooks  
├── useQuizGame.jsx # クイズロジック  
└── useGemini.js # Gemini API 処理

/utils  
└── generatePrompt.js # Gemini 用プロンプト組み立て

/lib  
└── supabaseAdmin.js # Supabase 管理用クライアント

/public  
└── /data/questions.json # クイズデータ

## 🛠️ 使用技術

- Next.js 14（App Router 構成）
- React 18 / JavaScript
- CSS Modules
- Google Generative AI (Gemini 1.5 Flash)
- NextAuth.js（Google OAuth）
- Supabase（ユーザー管理・RLS）

## 🌿 ブランチ運用ルール

- `feature/機能名` ブランチで作業
- GitHub 上で PR 作成 → `main` にマージ
- `main` は常に安定稼働状態を維持

## 🔐 管理機能

- 管理者メールアドレスを `page.jsx` に直接定義（今後 .env 化検討可）
- Supabase にはログインユーザーの登録日時・最終ログイン日時を保存
- `/admin` ページではユーザー情報を一覧表示（名前、メール、登録・最終ログイン日時）

## 🔮 今後の予定

- スコアに応じたコメント表示
- クイズ問題の外部 API 化（将来的拡張）
- デザインブラッシュアップ（レスポンシブ対応含む）
- 管理者権限を Supabase 側に移す（is_admin カラム検討）
- ユーザーの AI 質問履歴保存（オプション）

## ✅ 開発フロー

```bash
git checkout main
git pull origin main
git checkout -b feature/作業名
# 作業 → git add . → git commit -m "..."
git push -u origin feature/作業名
# GitHubでPR作成 → mainにマージ
```
