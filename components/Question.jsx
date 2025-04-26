// /components/Question.jsx
"use client";

export default function Question({ questionData, onAnswer, answered }) {
  return (
    <div>
      <h2>{questionData.question}</h2>
      {questionData.options.map((option, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button
            onClick={() => onAnswer(index)}
            disabled={answered}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
}
