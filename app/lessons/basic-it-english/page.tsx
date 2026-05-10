"use client";

import { useState } from "react";
export default function BasicITLEnglishPage() {
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "What is a server?",
      options: [
        "A computer that provides data or services",
        "A type of password",
        "A programming language",
      ],
      answer: 0,
    },
    {
      question: "What does 'bug' usually mean in IT?",
      options: [
        "A computer virus",
        "A problem in the software",
        "A hardware cable",
      ],
      answer: 1,
    },
    {
      question: "What does 'login' mean?",
      options: [
        "To connect a monitor",
        "To sign in to an account",
        "To restart the internet",
      ],
      answer: 1,
    },
  ];
  const allAnswered =
  selectedAnswers.length === questions.length &&
  selectedAnswers.every((answer) => answer !== undefined);
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Basic IT English
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Learn foundational English used in technology, support, and software environments.
        </p>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Lesson Objective</h2>
          <p className="text-gray-300">
            By the end of this lesson, students should be able to explain simple IT concepts in English and understand common workplace vocabulary.
          </p>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Vocabulary</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Server</li>
            <li>Network</li>
            <li>Database</li>
            <li>Bug</li>
            <li>Login</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Example Sentences</h2>
          <ul className="space-y-3 text-gray-300">
            <li>“The server is down right now.”</li>
            <li>“I cannot log in to my account.”</li>
            <li>“There is a bug in the application.”</li>
            <li>“The database stores customer information.”</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-semibold mb-4">Practice Prompt</h2>
  <p className="text-gray-300">
    Try explaining this in English:
  </p>
  <p className="text-gray-400 mt-3 italic">
    “My internet is slow, and I cannot connect to the server.”
  </p>
</section>
<section className="bg-gray-900 rounded-xl p-6 mt-10">
  <h2 className="text-2xl font-semibold mb-2">CGA Quiz</h2>
<p className="text-sm text-gray-400 mb-6">
  Answer all questions before submitting. This assignment is computer graded.
</p>

  <div className="space-y-8">
    {questions.map((q, questionIndex) => (
      <div key={questionIndex}>
        <p className="text-gray-200 font-medium mb-3">
          {questionIndex + 1}. {q.question}
        </p>

                <div className="space-y-2">
          {q.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => {
                const updatedAnswers = [...selectedAnswers];
                updatedAnswers[questionIndex] = optionIndex;
                setSelectedAnswers(updatedAnswers);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                showScore
                  ? optionIndex === q.answer
                    ? "bg-green-500 text-black"
                    : selectedAnswers[questionIndex] === optionIndex
                    ? "bg-red-500 text-white"
                    : "bg-gray-800 text-white"
                  : selectedAnswers[questionIndex] === optionIndex
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showScore && (
          <p className="mt-2 text-sm text-gray-400">
            Correct answer:{" "}
            <span className="text-green-400">
              {q.options[q.answer]}
            </span>
          </p>
        )}
      </div>
    ))}
  </div>

  <button
  onClick={() => {
    setShowScore(true);

    const score = questions.filter(
      (q, index) => selectedAnswers[index] === q.answer
    ).length;

    if (score >= 2) {
      const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");

      if (!completed.includes("Basic IT English")) {
        completed.push("Basic IT English");
        localStorage.setItem("completedLessons", JSON.stringify(completed));
      }
    }
  }}
  disabled={!allAnswered}
  className={`mt-8 px-6 py-3 font-semibold rounded-lg transition ${
    allAnswered
      ? "bg-green-500 text-black hover:bg-green-400"
      : "bg-gray-700 text-gray-400 cursor-not-allowed"
  }`}
>
  Submit CGA
</button>

  {showScore && (
  <div className="mt-6">
    <p className="text-green-400 font-semibold text-lg mb-2">
      Assignment Completed ✅
    </p>

    <p className="text-lg text-white">
      Score:{" "}
      {
        questions.filter(
          (q, index) => selectedAnswers[index] === q.answer
        ).length
      }
      /{questions.length}
    </p>

      <button
        onClick={() => {
          setSelectedAnswers([]);
          setShowScore(false);
        }}
        className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Reset Quiz
      </button>
    </div>
  )}
</section>
<div className="flex gap-4 mt-10">
  <a
    href="/lessons"
    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
  >
    Back to Lessons
  </a>

  <a
    href="/vocabulary"
    className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
  >
    Practice Vocabulary
  </a>
</div>
      </div>
    </main>
  );
}