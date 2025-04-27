// /app/quiz/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Question from "../../components/Question";
import AnswerResult from "../../components/AnswerResult";
import QuizResult from "../../components/QuizResult";
import { generatePrompt } from "../../utils/generatePrompt"; // ★追加
import styles from "./QuizPage.module.css";

// 配列をシャッフルしてcount個だけ取得する関数
const shuffleAndPick = (array, count) => {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
};

export default function QuizPage() {
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [answered, setAnswered] = useState(false);

  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // JSONから問題データをロード
  useEffect(() => {
    async function loadQuestions() {
      const res = await fetch("/data/questions.json");
      const data = await res.json();
      setQuestionsData(data);
      setSelectedQuestions(shuffleAndPick(data, 5));
    }
    loadQuestions();
  }, []);

  if (selectedQuestions.length === 0) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  // 回答を処理
  const handleAnswer = (index) => {
    const correctAnswer = currentQuestion.options[currentQuestion.answerIndex];
    if (index === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
      setAnswerResult(`正解！\n正解は「${correctAnswer}」です。`);
    } else {
      setAnswerResult(`不正解！\n正解は「${correctAnswer}」です。`);
    }
    setAnswered(true);
  };

  // 次の問題へ
  const handleNext = () => {
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      setShowResult(true);
    }
  };

  // もう一度挑戦
  const handleRetry = () => {
    setSelectedQuestions(shuffleAndPick(questionsData, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  // 質問・回答状態をリセット
  const resetQuestionState = () => {
    setAnswerResult(null);
    setAnswered(false);
    setUserPrompt("");
    setAiResponse("");
    setLoadingAi(false);
  };

  // AI追加質問を送信
  const handlePromptSubmit = async () => {
    if (!userPrompt.trim()) return;
    setLoadingAi(true);

    try {
      const correctAnswer =
        currentQuestion.options[currentQuestion.answerIndex];
      const combinedPrompt = generatePrompt(
        currentQuestion,
        correctAnswer,
        userPrompt
      ); // ★ここ！

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });

      const data = await response.json();
      setAiResponse(data.answer);
    } catch (error) {
      console.error("[クライアントエラー]", error);
      setAiResponse("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className={styles.quizContainer}>
      {/* いつでも表示するホームボタン */}
      <div className={styles.buttonContainer}>
        <Link href="/">
          <button className={styles.button}>ホームに戻る</button>
        </Link>
      </div>

      {!showResult ? (
        <>
          <h1 className={styles.questionNumber}>
            第{currentQuestionIndex + 1}問
          </h1>

          <Question
            questionData={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />

          {answerResult && (
            <AnswerResult
              answerResult={answerResult}
              userPrompt={userPrompt}
              setUserPrompt={setUserPrompt}
              handlePromptSubmit={handlePromptSubmit}
              aiResponse={aiResponse}
              loadingAi={loadingAi}
            />
          )}

          {answered && (
            <div className={styles.buttonContainer}>
              <button onClick={handleNext} className={styles.button}>
                次の問題へ
              </button>
            </div>
          )}
        </>
      ) : (
        <QuizResult
          score={score}
          totalQuestions={selectedQuestions.length}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
