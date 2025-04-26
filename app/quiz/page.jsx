"use client";

import { useState } from "react";

const questions = [
  {
    question: "Linuxで現在のディレクトリを表示するコマンドは？",
    options: ["ls", "pwd", "cd", "mkdir"],
    answerIndex: 1,
  },
  {
    question: "Linuxでファイルの内容を表示するコマンドは？",
    options: ["cat", "touch", "rm", "cp"],
    answerIndex: 0,
  },
  {
    question: "ディレクトリを作成するLinuxコマンドは？",
    options: ["mkdir", "rmdir", "cd", "ls"],
    answerIndex: 0,
  },
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (index) => {
    if (index === currentQuestion.answerIndex) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!showResult ? (
        <>
          <h1>クイズに挑戦！</h1>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((option, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <button
                style={{ padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            </div>
          ))}
        </>
      ) : (
        <div>
          <h1>クイズ終了！</h1>
          <h2>
            あなたのスコアは {score} / {questions.length} です。
          </h2>
        </div>
      )}
    </div>
  );
}
