"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function ExplainingTechnicalProblemsPage() {
  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "How should you describe a system issue?",
      options: [
        "It is broken.",
        "The system is experiencing a login failure when users attempt to sign in.",
        "Something is wrong.",
      ],
      answer: 1,
    },
    {
      question: "What makes a good bug explanation?",
      options: [
        "Clear details and steps to reproduce",
        "Short and unclear message",
        "Blaming others",
      ],
      answer: 0,
    },
    {
      question: "Which sounds most professional?",
      options: [
        "The server is slow sometimes.",
        "The server response time has increased significantly during peak hours.",
        "It is bad.",
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

    if (!completed.includes("Explaining Technical Problems")) {
      completed.push("Explaining Technical Problems");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }

    await saveLessonProgress({
      lessonSlug: "explaining-technical-problems",
      lessonTitle: "Explaining Technical Problems",
      completed: true,
      score,
    });
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Explaining Technical Problems
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Learn how to describe bugs, outages, slow systems, and other
            technical issues in clear English.
          </p>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Lesson Objective
            </h2>

            <p className="text-gray-300">
              By the end of this lesson, students should be able to explain
              technical problems clearly to teammates, managers, and clients.
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Key Vocabulary
            </h2>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Bug</li>
              <li>Outage</li>
              <li>Slow performance</li>
              <li>Error message</li>
              <li>Connection issue</li>
            </ul>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Example Sentences
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>
                “The application is showing an error message.”
              </li>

              <li>
                “We are experiencing slow performance on the server.”
              </li>

              <li>
                “There seems to be a connection issue with the database.”
              </li>

              <li>
                “The outage affected multiple users this morning.”
              </li>
            </ul>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Practice Prompt
            </h2>

            <p className="text-gray-300">
              Try explaining this in English:
            </p>

            <p className="text-gray-400 mt-3 italic">
              “The website is loading slowly, and some users cannot log in.”
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-2">
              CGA Quiz
            </h2>

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
                {score >= 2 ? (
                  <p className="text-green-400 font-semibold text-lg mb-2">
                    Assignment Complete ✅
                  </p>
                ) : (
                  <p className="text-red-400 font-semibold text-lg mb-2">
                    Not Passed ❌ — Try Again
                  </p>
                )}

                <button
                  onClick={() => {
                    setSelectedAnswers([]);
                    setShowScore(false);
                  }}
                  className="mt-4 px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  Retry
                </button>

                <p className="text-lg text-white mt-4">
                  Score: {score}/{questions.length}
                </p>
              </div>
            )}

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
                    router.push("/lessons/advanced-client-support");
                  }}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
                >
                  Next Lesson →
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}