// /utils/generatePrompt.js

export function generatePrompt(currentQuestion, correctAnswer, userPrompt) {
  return `
  あなたはITの専門家です。
  以下のクイズ内容とユーザー質問に対して、必ず**Markdown形式**でわかりやすく回答してください。
  
  【Markdown出力ルール】
  - 最初に「# 見出し」を付けてください
  - 要点は「- 箇条書き」で整理してください
  - コマンド例などは「\`\`\`コードブロック\`\`\`」で囲んでください
  - 通常の文章のみは禁止。必ずMarkdown構造で回答してください
  
  【クイズの問題】
  ${currentQuestion.question}
  
  【選択肢】
  ${currentQuestion.options.map((opt, idx) => `${idx + 1}. ${opt}`).join("\n")}
  
  【正解】
  ${correctAnswer}
  
  【ユーザーの追加質問】
  ${userPrompt}
  `;
}
