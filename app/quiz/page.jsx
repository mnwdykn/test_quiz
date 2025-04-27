"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Question from "../../components/Question";
import AnswerResult from "../../components/AnswerResult"; // 新規追加
import QuizResult from "../../components/QuizResult"; // 新規追加
import questions from "../../data/questions";
import styles from "./QuizPage.module.css";

// 配列をシャッフルして指定数だけ取得する関数
const shuffleAndPick = (array, count) => {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
};

export default function QuizPage() {
  // クイズに関する状態管理
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [answered, setAnswered] = useState(false);

  // 追加質問・AI回答に関する状態管理
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // 初回マウント時に問題をシャッフルしてセット
  useEffect(() => {
    setSelectedQuestions(shuffleAndPick(questions, 5));
  }, []);

  // 問題ロード中表示
  if (selectedQuestions.length === 0) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  // 解答ボタン押下時の処理
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

  // 次の問題へ進む処理
  const handleNext = () => {
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      setShowResult(true);
    }
  };

  // クイズをリトライする処理
  const handleRetry = () => {
    setSelectedQuestions(shuffleAndPick(questions, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  // 1問ごとの状態リセット処理
  const resetQuestionState = () => {
    setAnswerResult(null);
    setAnswered(false);
    setUserPrompt("");
    setAiResponse("");
    setLoadingAi(false);
  };

  // 追加質問をAIに送信して回答をもらう
  const handlePromptSubmit = async () => {
    if (!userPrompt.trim()) return;
    setLoadingAi(true);

    try {
      const correctAnswer =
        currentQuestion.options[currentQuestion.answerIndex];

      const combinedPrompt = `
あなたはITの専門家です。
以下のクイズの問題・選択肢・正解を踏まえて、ユーザーの質問にわかりやすく答えてください。

【クイズの問題】
${currentQuestion.question}

【選択肢】
${currentQuestion.options.map((opt, idx) => `${idx + 1}. ${opt}`).join("\n")}

【正解】
${correctAnswer}

【ユーザーの質問】
${userPrompt}
      `;

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
      {!showResult ? (
        <>
          {/* 問題番号表示 */}
          <h1 className={styles.questionNumber}>
            第{currentQuestionIndex + 1}問
          </h1>

          {/* クイズ問題コンポーネント */}
          <Question
            questionData={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />

          {/* 解答後、結果＆追加質問コンポーネントを表示 */}
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

          {/* 次の問題へ進むボタン */}
          {answered && (
            <div className={styles.buttonContainer}>
              <button onClick={handleNext} className={styles.button}>
                次の問題へ
              </button>
            </div>
          )}
        </>
      ) : (
        // クイズ結果画面
        <QuizResult
          score={score}
          totalQuestions={selectedQuestions.length}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
