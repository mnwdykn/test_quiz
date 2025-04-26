"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Question from "../../components/Question";
import questions from "../../data/questions";

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

  if (selectedQuestions.length === 0) {
    return <div>読み込み中...</div>;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

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
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerResult(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setSelectedQuestions(shuffleAndPick(questions, 5)); // 再シャッフル！
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
            あなたのスコアは {score} / {selectedQuestions.length} です。
          </h2>
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={handleRetry}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              もう一度挑戦する
            </button>
            <Link href="/">
              <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                ホームに戻る
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
