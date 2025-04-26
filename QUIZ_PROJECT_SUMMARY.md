# 📚 IT 系クイズアプリ - 開発ドキュメント

## 🚀 プロジェクト概要

IT 系知識を問う 4 択クイズアプリを Next.js で作成しています。
個人開発ですが、チーム開発フロー（ブランチ作成、PR 作成、main マージ）を意識して進めています。

## ✨ 現状できている機能

- ホーム画面に「クイズ開始ボタン」を設置
- 複数のクイズ問題を連続出題できる
- 正解・不正解を判定してメッセージを表示
- 「次へ」ボタンを押して次の問題へ進める
- 全問回答後にスコアを表示する

## 🗂️ ディレクトリ構成（主要部分）

```
/app
  └── /quiz
        └── page.jsx（クイズページ全体の管理）
/components
  └── Question.jsx（問題文と選択肢を表示するコンポーネント）
/data
  └── questions.js（クイズ問題データ）
```

## 🛠️ 使用技術

- Next.js 14 (App Router 構成)
- React 18
- JavaScript（TypeScript 化は今後検討）

## 🌿 ブランチ運用ルール

- 開発作業は必ず`feature/〇〇`ブランチで行う
- 完了後、GitHub で Pull Request（PR）を作成して main にマージ
- main ブランチは常に安定して動作する状態を保つ

## 🔮 今後の予定（ToDo）

- クイズ終了後、リトライできる機能を追加
- スコアに応じたコメント表示機能を追加
- 問題データを外部 API 化（将来的な拡張）
- スタイリング強化
- テストコード追加（Jest + React Testing Library 想定）

## 📎 注意事項

- 1 つの機能開発につき、必ずブランチを切ること
- コミットメッセージは内容が明確にわかる表現にする
- PR 作成時には簡単な変更内容説明をコメントに添える

## ✅ 簡易開発の流れまとめ

```
1. git checkout main
2. git pull origin main
3. git checkout -b feature/作業内容
4. ファイル編集・保存
5. git add .
6. git commit -m "作業内容"
7. git push -u origin feature/作業内容
8. GitHubでPull Request作成
9. マージ
10. git checkout main
11. git pull origin main
```
