"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // ← GFMプラグインを使う！
import styles from "./AnswerResult.module.css";

export default function AnswerResult({
  answerResult,
  userPrompt,
  setUserPrompt,
  handlePromptSubmit,
  aiResponse,
  loadingAi,
}) {
  return (
    <>
      <div className={styles.answerResult}>
        {answerResult.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      <div className={styles.promptContainer}>
        <h3>追加で質問してみよう！</h3>
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="例: このコマンドの応用例を教えて"
          className={styles.promptInput}
        />
        <button
          onClick={handlePromptSubmit}
          className={styles.button}
          disabled={loadingAi}
        >
          質問を送信
        </button>
      </div>

      {loadingAi ? (
        <p>回答を取得中...</p>
      ) : (
        aiResponse && (
          <div className={styles.aiResponse}>
            <h4>AIからの回答：</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {aiResponse}
            </ReactMarkdown>
          </div>
        )
      )}
    </>
  );
}
