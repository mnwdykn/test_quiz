"use client";

import { useState } from "react";
import Question from "../../components/Question";
import questions from "../../data/questions";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (index) => {
    if (index === currentQuestion.answerIndex) {
      setScore(score + 1);
      setAnswerResult("正解！");
    } else {
      setAnswerResult("不正解！");
    }
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerResult(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  // 🔥 リトライ用の関数を追加
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswerResult(null);
    setAnswered(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!showResult ? (
        <>
          <h1>クイズに挑戦！</h1>
          <Question
            questionData={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />

          {answerResult && (
            <div style={{ marginTop: "20px", fontSize: "24px" }}>
              {answerResult}
            </div>
          )}

          {answered && (
            <div style={{ marginTop: "30px" }}>
              <button
                onClick={handleNext}
                style={{ padding: "10px 20px", fontSize: "16px" }}
              >
                次の問題へ
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <h1>クイズ終了！</h1>
          <h2>
            あなたのスコアは {score} / {questions.length} です。
          </h2>

          {/* 🔥 リトライボタンを表示 */}
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={handleRetry}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              もう一度挑戦する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
