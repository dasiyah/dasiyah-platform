"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function MeetingsCommunicationPage() {
  const router = useRouter();
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "What is the best way to start a meeting update?",
      options: [
        "Here’s a quick update.",
        "I do not know.",
        "Wait a minute.",
      ],
      answer: 0,
    },
    {
      question: "What should you say if you need more explanation?",
      options: [
        "That makes no sense.",
        "Can you clarify that point?",
        "You are wrong.",
      ],
      answer: 1,
    },
    {
      question: "Which response sounds professional?",
      options: [
        "I’ll follow up after the meeting.",
        "Whatever.",
        "Not my problem.",
      ],
      answer: 0,
    },
  ];

  const allAnswered =
    selectedAnswers.length === questions.length &&
    selectedAnswers.every((answer) => answer !== undefined);
    const score = selectedAnswers.reduce((total, answer, index) => {
  return answer === questions[index].answer ? total + 1 : total;
}, 0);
const handleRetry = () => {
  setSelectedAnswers([]);
  setShowScore(false);
};
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Meetings & Communication
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Practice speaking clearly in meetings, giving updates, asking questions, and responding professionally.
        </p>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Lesson Objective</h2>
          <p className="text-gray-300">
            By the end of this lesson, students should be able to communicate clearly during meetings and explain progress in professional English.
          </p>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Phrases</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>I’d like to give a quick update.</li>
            <li>Can you clarify that point?</li>
            <li>We are currently working on that issue.</li>
            <li>I agree with that approach.</li>
            <li>Let’s follow up after the meeting.</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Example Sentences</h2>
          <ul className="space-y-3 text-gray-300">
            <li>“I’d like to give a quick update on the project.”</li>
            <li>“Can you clarify what you mean by deployment timeline?”</li>
            <li>“We are currently working on the login issue.”</li>
            <li>“Let’s follow up after the meeting.”</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Practice Prompt</h2>
          <p className="text-gray-300">
            Try explaining this in English:
          </p>
          <p className="text-gray-400 mt-3 italic">
            “I want to update my team about a bug we are fixing and ask one question before the meeting ends.”
          </p>
        </section>
<section className="bg-gray-900 rounded-xl p-6 mt-10">
  <h2 className="text-2xl font-semibold mb-6">CGA (Check Your Understanding)</h2>

  {questions.map((q, qIndex) => (
    <div key={qIndex} className="mb-6">
      <p className="mb-3 text-gray-300">
        {qIndex + 1}. {q.question}
      </p>

      <div className="space-y-2">
        {q.options.map((option, oIndex) => (
          <button
            key={oIndex}
            onClick={() => {
              const updated = [...selectedAnswers];
              updated[qIndex] = oIndex;
              setSelectedAnswers(updated);
            }}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              selectedAnswers[qIndex] === oIndex
                ? "bg-green-500 text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  ))}

  <button
  onClick={() => {
  setShowScore(true);

  if (score >= 2) {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");

    if (!completed.includes("Meetings & Communication")) {
      completed.push("Meetings & Communication");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }
  }
}}
    disabled={!allAnswered}
    className={`mt-6 px-6 py-3 font-semibold rounded-lg transition ${
      allAnswered
        ? "bg-green-500 text-black hover:bg-green-400"
        : "bg-gray-700 text-gray-400 cursor-not-allowed"
    }`}
  >
    Submit CGA
  </button>

  {showScore && (
  <div className="mt-6 p-6 bg-gray-800 rounded-xl text-center">
    <h2 className="text-2xl font-bold text-green-400">
      Your Score: {score} / {questions.length}
    </h2>

    <p className="mt-2 text-gray-300">
      {score === questions.length
        ? "🔥 Excellent!"
        : score >= 2
        ? "👍 Good job!"
        : "📘 Review the lesson and try again."}
    </p>
    <button
  onClick={handleRetry}
  className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
>
  Retry
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

  <button
  onClick={() => {
    const subscribed = localStorage.getItem("isSubscribed") === "true";

    if (subscribed) {
      router.push("/lessons/talking-to-a-client");
    } else {
      router.push("/upgrade");
    }
  }}
  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
>
  Next Lesson →
</button>
</div>
      </div>
    </main>
  );
}