# 📚 IT 系クイズアプリ - 開発ドキュメント（最新版）

## 🚀 プロジェクト概要

IT 系の基礎知識を問う 4 択クイズアプリを Next.js で開発しています。  
個人開発ですが、チーム開発を意識したフロー（ブランチ作成、PR 作成、main マージ）を取り入れています。

データとロジックを分離し、問題データは JSON ファイル（`/public/data/questions.json`）から動的に読み込む形式に移行しました。  
また、**Google アカウントによるログイン機能**を実装し、ログイン状態に応じた機能制御も行なっています。

## ✨ 現在できている機能

- ホーム画面に「クイズ開始ボタン」を設置
- クイズ問題をランダム抽出（シャッフルして 5 問選択）して連続出題
- 正解・不正解を判定し、正解内容も表示
- 回答後に「次の問題へ」ボタンで次に進める
- 全問終了後にスコア（正解数）を表示
- クイズ終了後に「もう一度挑戦する」ボタンでリトライ可能
- クイズ終了画面に「ホームに戻る」ボタンを設置
- 読み込み中は「読み込み中...」メッセージを表示
- 回答後、「追加質問（AI 回答）」フォームを表示し、ユーザーの自由質問に Gemini API が回答
- 回答中ローディング表示（「回答を取得中...」）
- クイズ画面の正誤結果、追加質問エリア、クイズ終了画面をそれぞれ独立コンポーネント化（AnswerResult / QuizResult）
- 問題データを `/public/data/questions.json` から動的に fetch して読み込み
- **Google アカウントによるログイン/ログアウト機能を追加**
- **ログイン状態（ユーザー名）を全ページ共通で表示（ClientLayout + LoginButton）**
- **App Router 構成に準拠したクライアント／サーバー分離構成を実現**
- **ゲーム進行ロジックをカスタムフック `useQuizGame` として分離・再利用可能に整理**

## 🗂️ ディレクトリ構成

```
/app
  ├── layout.js（全体レイアウト：サーバーコンポーネント）
  ├── ClientLayout.jsx（SessionProvider専用ラッパー：use client 指定）
  ├── page.js（ホーム画面）
  ├── /api
  │     ├── /generate
  │     │     └── route.js（Gemini API連携エンドポイント）
  │     └── /auth
  │           └── [...nextauth]
  │                 └── route.js（NextAuth用ログインAPIエンドポイント）
  └── /quiz
        ├── QuizPage.module.css（クイズ画面用CSS）
        └── page.jsx（クイズ画面本体 ※クライアントコンポーネント）

/components
  ├── ClientHeader.jsx（ヘッダー：アプリ名＋LoginButton表示）※"use client"
  ├── Question.jsx（問題文と選択肢表示コンポーネント）※"use client"
  ├── Question.module.css
  ├── AnswerResult.jsx（正誤結果・AI回答フォーム）※"use client"
  ├── AnswerResult.module.css
  ├── QuizResult.jsx（クイズ終了画面）※"use client"
  ├── QuizResult.module.css
  ├── LoginButton.jsx（Googleログイン＋ユーザー名表示）※"use client"
  └── LoginButton.module.css（ログイン状態表示の専用CSS）

/hooks
  └── useQuizGame.js（ゲーム進行ロジックを担当するカスタムフック）

/utils
  └── generatePrompt.js（Gemini用プロンプト生成処理）

/public
  └── /data
       └── questions.json（クイズ問題データ）
```

## 🛠️ 使用技術

- **Next.js 14**（App Router 構成）
- **React 18**
- **JavaScript**
- **Google Generative AI**（Gemini 1.5 Pro API）
- **NextAuth.js**（Google OAuth）
- **CSS Modules**

※将来的に TypeScript や Tailwind CSS への移行を検討中

## 🌿 ブランチ運用ルール

- 開発は必ず `feature/機能名` ブランチで作業する
- 作業完了後は GitHub で Pull Request を作成して main へマージ
- `main`ブランチは常に安定稼働する状態を保つ

## 🔮 今後の予定（ToDo）

- スコアに応じたコメント表示機能の追加
- 問題データを外部 API 連携に切り替え（将来的拡張）
- スタイリングのさらなる強化（デザインブラッシュアップ）
- テストコード（Jest + React Testing Library）追加
- ユーザーの AI 質問履歴保存・表示機能追加（検討中）
- **未ログイン時はクイズ開始禁止**（未実装）

## 📎 注意事項

- 1 つの機能開発ごとに必ずブランチを分けること
- コミットメッセージは作業内容が一目でわかる表現にすること
- PR 作成時には変更内容の簡単な説明を添えること

## ✅ 開発フローまとめ

```
1. git checkout main
2. git pull origin main
3. git checkout -b feature/作業内容
4. 作業・ファイル編集・保存
5. git add .
6. git commit -m "作業内容"
7. git push -u origin feature/作業内容
8. GitHubでPull Request作成
9. レビューしてmainにマージ
10. git checkout main
11. git pull origin main
```
