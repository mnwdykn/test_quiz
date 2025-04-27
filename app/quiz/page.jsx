"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Question from "../../components/Question";
import AnswerResult from "../../components/AnswerResult";
import QuizResult from "../../components/QuizResult";
import styles from "./QuizPage.module.css";

// 配列をシャッフルして指定数だけ取得する関数
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

  // JSONファイルから問題データをロード
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

  const handleNext = () => {
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setSelectedQuestions(shuffleAndPick(questionsData, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setAnswerResult(null);
    setAnswered(false);
    setUserPrompt("");
    setAiResponse("");
    setLoadingAi(false);
  };

  const handlePromptSubmit = async () => {
    if (!userPrompt.trim()) return;
    setLoadingAi(true);

    try {
      const correctAnswer =
        currentQuestion.options[currentQuestion.answerIndex];

      const combinedPrompt = `
あなたはITの専門家です。
以下のクイズ内容とユーザー質問に対して、必ず**Markdown形式**でわかりやすく回答してください。

【Markdown出力ルール】
- 最初に「# 見出し」を付けてください
- 要点は「- 箇条書き」で整理してください
- コマンド例などは「\`\`\`コードブロック\`\`\`」で囲んでください
- 通常の文章のみは禁止。必ずMarkdown構造で回答してください

【クイズの問題】
${currentQuestion.question}

【選択肢】
${currentQuestion.options.map((opt, idx) => `${idx + 1}. ${opt}`).join("\n")}

【正解】
${correctAnswer}

【ユーザーの追加質問】
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
