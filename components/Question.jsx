"use client";

import styles from "./Question.module.css"; // CSSモジュール読み込み

export default function Question({ questionData, onAnswer, answered }) {
  return (
    <div>
      {/* 問題文 */}
      <h2 className={styles.questionTitle}>{questionData.question}</h2>

      {/* 選択肢リスト */}
      {questionData.options.map((option, index) => (
        <div key={index} className={styles.optionWrapper}>
          <button
            onClick={() => onAnswer(index)}
            disabled={answered}
            className={styles.optionButton}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
}
