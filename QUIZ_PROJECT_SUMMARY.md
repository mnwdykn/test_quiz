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
- **ログイン状態（ユーザー名）を全ページ共通で表示（ClientHeader）**
- **App Router 構成に準拠したクライアント／サーバー分離構成を実現**
- Gemini の AI 回答機能をクライアントフック（`useGemini.js`）で管理
- Quiz 進行ロジックを独立フック（`useQuizGame.js`）として抽出・再利用化
- **ログインしていない場合、Gemini API へのリクエストをサーバーでブロック**
- **Gemini 機能を ON/OFF 可能に設計（環境設定で切替）**

## 🗂️ ディレクトリ構成

```
/app
  ├── layout.js（全体レイアウト：サーバーコンポーネント）
  ├── ClientLayout.jsx（SessionProvider用ラッパー。ヘッダー・子要素を囲む）※"use client"
  ├── page.js（ホーム画面）
  ├── /api
  │     ├── /generate
  │     │     └── route.js（Gemini API連携エンドポイント）
  │     └── /auth
  │           └── [...nextauth]/route.js（NextAuthログインAPI）
  └── /quiz
        ├── page.jsx（クイズ画面本体）
        └── QuizPage.module.css（クイズ画面用スタイル）

/components
  ├── LoginButton.jsx（ログイン状態の取得・制御専用。UIは親に委ねる）※"use client"
  ├── ClientHeader.jsx（ヘッダーUI。アプリ名＋ログイン状態表示）※"use client"
  ├── ClientHeader.module.css
  ├── Question.jsx / Question.module.css
  ├── AnswerResult.jsx / AnswerResult.module.css
  ├── QuizResult.jsx / QuizResult.module.css

/hooks
  ├── useQuizGame.js（クイズの状態・進行管理用）
  └── useGemini.js（AI質問の入力・応答状態管理）

/utils
  └── generatePrompt.js（Geminiへの送信プロンプト生成関数）

/public/data
  └── questions.json（クイズ問題データ）
```

## 🛠️ 使用技術

- **Next.js 14**（App Router 構成）
- **React 18**
- **JavaScript**
- **Google Generative AI**（Gemini 1.5 Flash）
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
