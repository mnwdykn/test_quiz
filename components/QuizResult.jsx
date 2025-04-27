"use client";

import Link from "next/link";
import styles from "./QuizResult.module.css"; // 専用CSS

export default function QuizResult({ score, totalQuestions, onRetry }) {
  return (
    <div className={styles.resultContainer}>
      {/* クイズ終了メッセージ */}
      <h1>クイズ終了！</h1>

      {/* スコア表示 */}
      <h2 className={styles.scoreText}>
        あなたのスコアは {score} / {totalQuestions} です。
      </h2>

      {/* リトライボタンとホームボタン */}
      <div className={styles.buttonContainer}>
        <button onClick={onRetry} className={styles.button}>
          もう一度挑戦する
        </button>
      </div>
    </div>
  );
}
