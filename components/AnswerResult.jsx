"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./AnswerResult.module.css";

const ENABLE_GEMINI = false; // Gemini機能のON/OFF切替

export default function AnswerResult({
  answerResult,
  userPrompt,
  setUserPrompt,
  handlePromptSubmit,
  aiResponse,
  loadingAi,
  session,
}) {
  if (!answerResult) return null;

  return (
    <>
      {/* 正誤メッセージ（色分け） */}
      <div className={styles.answerResult}>
        {answerResult.split("\n").map((line, idx) => {
          if (idx === 0) {
            const isCorrect = line.trim() === "正解！"; // ✅ 完全一致で判定
            return (
              <p
                key={idx}
                style={{
                  color: isCorrect ? "#d32f2f" : "#1976d2",
                  fontWeight: "bold",
                }}
              >
                {line}
              </p>
            );
          }

          return (
            <p key={idx} style={{ color: "#333", marginTop: "4px" }}>
              {line}
            </p>
          );
        })}
      </div>

      {/* Gemini追加質問フォーム */}
      {ENABLE_GEMINI && (
        <div className={styles.promptContainer}>
          <h3>追加で質問してみよう！</h3>
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="例: このコマンドの応用例を教えて"
            className={styles.promptInput}
          />

          <div className={styles.promptButtonArea}>
            <button
              onClick={handlePromptSubmit}
              className={styles.button}
              disabled={loadingAi || !session || !userPrompt.trim()}
            >
              質問を送信
            </button>

            {!session && (
              <p className={styles.loginWarning}>※ログインすると質問できます</p>
            )}
          </div>
        </div>
      )}

      {/* GeminiのAI回答表示 */}
      {ENABLE_GEMINI &&
        (loadingAi ? (
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
        ))}
    </>
  );
}
