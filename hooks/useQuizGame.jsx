// /hooks/useQuizGame.js
import { useState, useEffect } from "react";

const shuffleAndPick = (array, count) => {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
};

export function useQuizGame(questionCount = 5) {
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      const res = await fetch("/data/questions.json");
      const data = await res.json();
      setQuestionsData(data);
      setSelectedQuestions(shuffleAndPick(data, questionCount));
    }
    loadQuestions();
  }, [questionCount]);

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
    setSelectedQuestions(shuffleAndPick(questionsData, questionCount));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setAnswerResult(null);
    setAnswered(false);
  };

  return {
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
    resetQuestionState,
  };
}
