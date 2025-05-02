// /app/quiz/page.jsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Question from "../../components/Question";
import AnswerResult from "../../components/AnswerResult";
import QuizResult from "../../components/QuizResult";
import { generatePrompt } from "../../utils/generatePrompt";
import { useQuizGame } from "../../hooks/useQuizGame";
import styles from "./QuizPage.module.css";

export default function QuizPage() {
  const { data: session } = useSession();

  const {
    currentQuestion,
    selectedQuestions,
    currentQuestionIndex,
    score,
    showResult,
    answerResult,
    answered,
    handleAnswer,
    handleNext,
    handleRetry,
  } = useQuizGame(5);

  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  if (!currentQuestion) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

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
      );

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: combinedPrompt }),
        credentials: "include",
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
              session={session}
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
