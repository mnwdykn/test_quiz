"use client";

import { useState } from "react";

const questionData = {
  question: "Linuxで現在のディレクトリを表示するコマンドは？",
  options: ["ls", "pwd", "cd", "mkdir"],
  answerIndex: 1, // "pwd"が正解
};

export default function QuizPage() {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questionData.answerIndex) {
      setResult("正解！");
    } else {
      setResult("不正解！");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>/app/quiz/page.jsx</h2>
      <h2>{questionData.question}</h2>

      {questionData.options.map((option, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button onClick={() => handleAnswer(index)}>{option}</button>
        </div>
      ))}

      {result && (
        <div style={{ marginTop: "30px", fontSize: "24px" }}>{result}</div>
      )}
    </div>
  );
}
