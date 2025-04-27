"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Question from "../../components/Question";
import questions from "../../data/questions";
import styles from "./QuizPage.module.css";

// 配列をシャッフルして指定数だけ取得
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
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // 初回マウント時に問題をシャッフルして選択
  useEffect(() => {
    setSelectedQuestions(shuffleAndPick(questions, 5));
  }, []);

  // 問題がまだ準備できていない場合のローディング表示
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

  // 次の問題へ進む
  const handleNext = () => {
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      setShowResult(true);
    }
  };

  // クイズをリトライする
  const handleRetry = () => {
    setSelectedQuestions(shuffleAndPick(questions, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  // 1問ごとの状態リセット
  const resetQuestionState = () => {
    setAnswerResult(null);
    setAnswered(false);
    setUserPrompt("");
    setAiResponse("");
  };

  // ユーザーのプロンプトを送信してAI回答を取得
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
          {/* 問題番号 */}
          <h1 className={styles.questionNumber}>
            第{currentQuestionIndex + 1}問
          </h1>

          {/* 問題コンポーネント */}
          <Question
            questionData={currentQuestion}
            onAnswer={handleAnswer}
            answered={answered}
          />

          {/* 正誤結果・追加質問セクション */}
          {answerResult && (
            <>
              <div className={styles.answerResult}>
                {answerResult.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* ユーザー質問フォーム */}
              <div className={styles.promptContainer}>
                <h3>追加で質問してみよう！</h3>
                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="例: このコマンドの応用例を教えて"
                  className={styles.promptInput}
                />
                <button
                  onClick={handlePromptSubmit}
                  className={styles.button}
                  disabled={loadingAi}
                >
                  質問を送信
                </button>
              </div>

              {/* AIからの回答表示 */}
              {loadingAi ? (
                <p>回答を取得中...</p>
              ) : (
                aiResponse && (
                  <div className={styles.aiResponse}>
                    <h4>AIからの回答：</h4>
                    <p>{aiResponse}</p>
                  </div>
                )
              )}
            </>
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
        // 結果画面
        <div className={styles.resultContainer}>
          <h1>クイズ終了！</h1>
          <h2 className={styles.scoreText}>
            あなたのスコアは {score} / {selectedQuestions.length} です。
          </h2>
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
