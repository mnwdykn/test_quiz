"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Question from "../../components/Question";
import questions from "../../data/questions";
import styles from "./QuizPage.module.css"; // CSSモジュールをインポート

// シャッフルして5問だけ選ぶ関数
const shuffleAndPick = (array, count) => {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
};

export default function QuizPage() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [answered, setAnswered] = useState(false);

  // マウント後にランダム抽出
  useEffect(() => {
    setSelectedQuestions(shuffleAndPick(questions, 5));
  }, []);

  // ローディング中の表示
  if (selectedQuestions.length === 0) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  // 選択肢を選んだ時の処理
  const handleAnswer = (index) => {
    if (index === currentQuestion.answerIndex) {
      setScore(score + 1);
      setAnswerResult("正解！");
    } else {
      setAnswerResult("不正解！");
    }
    setAnswered(true);
  };

  // 「次の問題へ」ボタンを押した時の処理
  const handleNext = () => {
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerResult(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  // 「もう一度挑戦する」ボタンを押した時の処理
  const handleRetry = () => {
    setSelectedQuestions(shuffleAndPick(questions, 5)); // 再シャッフル！
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswerResult(null);
    setAnswered(false);
  };

  return (
    <div className={styles.quizContainer}>
      {!showResult ? (
        <>
          {/* 問題番号表示 */}
          <h1 className={styles.questionNumber}>
            第{currentQuestionIndex + 1}問
          </h1>

          {/* クイズ問題の表示 */}
          <Question
            questionData={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />

          {/* 正解・不正解メッセージ */}
          {answerResult && (
            <div className={styles.answerResult}>{answerResult}</div>
          )}

          {/* 「次の問題へ」ボタン */}
          {answered && (
            <div className={styles.buttonContainer}>
              <button onClick={handleNext} className={styles.button}>
                次の問題へ
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          {/* クイズ終了画面 */}
          <h1>クイズ終了！</h1>
          <h2 className={styles.scoreText}>
            あなたのスコアは {score} / {selectedQuestions.length} です。
          </h2>

          {/* 「もう一度挑戦する」「ホームに戻る」ボタン */}
          <div className={styles.buttonContainer}>
            <button onClick={handleRetry} className={styles.button}>
              もう一度挑戦する
            </button>
            <Link href="/">
              <button className={styles.button}>ホームに戻る</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
