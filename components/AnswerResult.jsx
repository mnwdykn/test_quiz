"use client";

import styles from "./AnswerResult.module.css"; // 専用CSS

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
      {/* 正解・不正解メッセージ表示 */}
      <div className={styles.answerResult}>
        {answerResult.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      {/* 追加質問フォーム */}
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

      {/* AIからの回答表示 */}
      {loadingAi ? (
        <p>回答を取得中...</p>
      ) : (
        aiResponse && (
          <div className={styles.aiResponse}>
            <h4>AIからの回答：</h4>
            <p>{aiResponse}</p>
          </div>
        )
      )}
    </>
  );
}
