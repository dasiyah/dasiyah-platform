"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function SoftwareInstallationPage() {
  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "What is the first step before installing software?",
      options: [
        "Restart the computer randomly",
        "Check system requirements",
        "Delete all files",
      ],
      answer: 1,
    },
    {
      question: "Which sentence sounds most professional?",
      options: [
        "Please download the installer from the official website.",
        "Just click random buttons.",
        "I don’t know how to install it.",
      ],
      answer: 0,
    },
    {
      question: "Why are software updates important?",
      options: [
        "They improve security and performance",
        "They damage the operating system",
        "They slow every computer permanently",
      ],
      answer: 0,
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

    if (!completed.includes("Software Installation")) {
      completed.push("Software Installation");
      localStorage.setItem("completedLessons", JSON.stringify(completed));
    }

    await saveLessonProgress({
      lessonSlug: "software-installation",
      lessonTitle: "Software Installation",
      completed: true,
      score,
    });
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Software Installation
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Learn how to explain software installation steps, updates, and setup
            processes in professional IT English.
          </p>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Lesson Objective
            </h2>

            <p className="text-gray-300">
              By the end of this lesson, students should be able to guide users
              through installing and updating software applications.
            </p>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Key Vocabulary
            </h2>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Installer</li>
              <li>Setup wizard</li>
              <li>System requirements</li>
              <li>Software update</li>
              <li>Installation process</li>
            </ul>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Example Sentences
            </h2>

            <ul className="space-y-3 text-gray-300">
              <li>
                “Please download the installer from the official website.”
              </li>

              <li>
                “The setup wizard will guide you through the installation.”
              </li>

              <li>
                “Your software has been updated successfully.”
              </li>

              <li>
                “Please verify the system requirements before installing.”
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
              “The user needs help installing the newest software version.”
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
                    router.push("/dashboard");
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