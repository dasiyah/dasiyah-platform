"use client";

import PremiumRoute from "@/components/PremiumRoute";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function TalkingToClientPage() {
  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "What is the best first response to the client?",
      options: [
        "Restart your computer.",
        "I’m sorry you’re having this issue. Can you tell me what happens when you open the app?",
        "That is not my department.",
      ],
      answer: 1,
    },
    {
      question: "What should you do before giving a solution?",
      options: [
        "Ask the client to explain the problem",
        "Ignore the issue",
        "Tell them it will fix itself",
      ],
      answer: 0,
    },
    {
      question: "Which response sounds the most professional?",
      options: [
        "What did you do wrong?",
        "I’m checking the system now.",
        "That sounds bad.",
      ],
      answer: 1,
    },
  ];

  const allAnswered =
    selectedAnswers.length === questions.length &&
    selectedAnswers.every((answer) => answer !== undefined);

  const score = questions.filter(
    (q, index) => selectedAnswers[index] === q.answer
  ).length;

  const saveCompletion = async () => {
    const completed = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    );

    if (!completed.includes("Talking to a Client")) {
      completed.push("Talking to a Client");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }

    await saveLessonProgress({
      lessonSlug: "talking-to-a-client",
      lessonTitle: "Talking to a Client",
      completed: true,
      score,
    });
  };

  return (
    <ProtectedRoute>
      <PremiumRoute>
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Talking to a Client
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Learn how to communicate with clients when they have technical
            problems.
          </p>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Lesson Objective</h2>
            <p className="text-gray-300">
              By the end of this lesson, you should be able to ask questions and
              help fix simple problems.
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Phrases</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Can you describe the issue?</li>
              <li>I’m checking the system now.</li>
              <li>Please try restarting your device.</li>
              <li>The issue should be fixed now.</li>
            </ul>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Real Scenario</h2>
            <p className="text-gray-300">A client sends this message:</p>
            <p className="text-gray-400 mt-3 italic">
              “Hi, my app is not opening and I need to use it right now.”
            </p>
            <p className="text-gray-300 mt-4">
              Your job is to respond professionally and help the client.
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Suggested Response</h2>
            <p className="text-gray-300">
              “I’m sorry you’re having this issue. Can you tell me what happens
              when you try to open the app?”
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Real Scenario #2</h2>
            <p className="text-gray-300">A client says:</p>
            <p className="text-gray-400 mt-3 italic">
              “My internet is very slow and I cannot work.”
            </p>
            <p className="text-gray-300 mt-4">
              What would you say to help them?
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-2">CGA Quiz</h2>

            <p className="text-sm text-gray-400 mb-6">
              Answer all questions before submitting.
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
              onClick={async () => {
                setShowScore(true);

                if (score >= 2) {
                  await saveCompletion();
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
                <p
                  className={`font-semibold text-lg mb-2 ${
                    score >= 2 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {score >= 2 ? "Assignment Complete ✅" : "Try Again ❌"}
                </p>

                <p className="text-lg text-white">
                  Score: {score}/{questions.length}
                </p>

                {score < 2 && (
                  <button
                    onClick={() => {
                      setSelectedAnswers([]);
                      setShowScore(false);
                    }}
                    className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                  >
                    Retry
                  </button>
                )}
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

            {showScore && score >= 2 && (
              <button
                onClick={() => {
                  const subscribed =
                    localStorage.getItem("isSubscribed") === "true";

                  if (subscribed) {
                    router.push("/lessons/explaining-technical-problems");
                  } else {
                    router.push("/upgrade");
                  }
                }}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
              >
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      </main>
      </PremiumRoute>
    </ProtectedRoute>
  );
}