"use client";

import styles from "./Question.module.css";

export default function Question({ questionData, onAnswer, answered }) {
  return (
    <div className={styles.questionContainer}>
      {/* 問題文 */}
      <h2 className={styles.questionTitle}>{questionData.question}</h2>

      {/* 選択肢リスト */}
      <div className={styles.options}>
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={answered}
            className={styles.optionButton}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
