import { useState } from "react";
import { generatePrompt } from "../utils/generatePrompt";

export function useGemini(currentQuestion) {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const submitPrompt = async () => {
    if (!userPrompt.trim()) return;
    setLoadingAi(true);
    try {
      const correctAnswer = currentQuestion.options[currentQuestion.answerIndex];
      const prompt = generatePrompt(currentQuestion, correctAnswer, userPrompt);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        credentials: "include",
      });
      const data = await res.json();
      setAiResponse(data.answer);
    } catch (err) {
      setAiResponse("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoadingAi(false);
    }
  };

  return {
    userPrompt,
    setUserPrompt,
    aiResponse,
    loadingAi,
    submitPrompt,
  };
}