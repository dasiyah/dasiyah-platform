"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function PasswordResetSupportLesson() {
  const questions = [
    {
      question: "What is commonly used to confirm a user's identity?",
      options: [
        "Verification code",
        "Printer cable",
        "Speaker volume",
        "Wallpaper",
      ],
      answer: "Verification code",
    },
    {
      question: "Why do users reset passwords?",
      options: [
        "To increase internet speed",
        "Because they forgot their password",
        "To clean the keyboard",
        "To print documents",
      ],
      answer: "Because they forgot their password",
    },
    {
      question: "What should a strong password include?",
      options: [
        "Only numbers",
        "Only letters",
        "A mix of letters, numbers, and symbols",
        "Only spaces",
      ],
      answer: "A mix of letters, numbers, and symbols",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const [quizChecked, setQuizChecked] = useState(false);
  const [score, setScore] = useState(0);

  function selectAnswer(questionIndex: number, option: string) {
    if (quizChecked) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  }

  function checkQuiz() {
    let correct = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);

    setScore(finalScore);
    setQuizChecked(true);
  }

  async function completeLesson() {
    await saveLessonProgress({
      lessonSlug: "password-reset-support",
      lessonTitle: "Password Reset Support",
      completed: true,
      score,
    });

    alert("Lesson Completed!");
  }

  const allQuestionsAnswered =
    Object.keys(selectedAnswers).length === questions.length;

  const passed = quizChecked && score >= 70;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Password Reset Support
          </h1>

          <p className="text-gray-300 mb-8">
            Learn how IT support workers help users recover and reset passwords safely.
          </p>

          {/* Vocabulary */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Vocabulary
            </h2>

            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Reset</h3>
                <p>To create a new password or restore account access.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Verification Code</h3>
                <p>A security code used to confirm identity.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Temporary Password</h3>
                <p>A short-term password used before creating a new one.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Authentication</h3>
                <p>The process of confirming identity.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Security</h3>
                <p>Protection of accounts and information.</p>
              </div>
            </div>
          </div>

          {/* Core Phrases */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Core Phrases
            </h2>

            <div className="space-y-3">
              <div className="bg-zinc-900 p-4 rounded-xl">
                “Please check your email for the verification code.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Your password has been successfully reset.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Please create a strong password.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Use the temporary password to sign in.”
              </div>
            </div>
          </div>

          {/* Scenario */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Real-World Scenario
            </h2>

            <div className="bg-zinc-900 p-6 rounded-xl">
              <p className="mb-4">
                A customer forgot their password and cannot access their account.
              </p>

              <p className="mb-2">
                Support: “Please check your email for the verification code.”
              </p>

              <p className="mb-2">
                Customer: “Okay, I received it.”
              </p>

              <p>
                Support: “Great. Now create a new password.”
              </p>
            </div>
          </div>

          {/* Quiz */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Quick Quiz
            </h2>

            <div className="space-y-6">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 p-6 rounded-xl"
                >
                  <h3 className="font-bold mb-4">
                    {q.question}
                  </h3>

                  <div className="grid gap-3">
                    {q.options.map((option) => {
                      const selected = selectedAnswers[index] === option;
                      const correct = quizChecked && option === q.answer;
                      const wrong =
                        quizChecked && selected && option !== q.answer;

                      return (
                        <button
                          key={option}
                          onClick={() => selectAnswer(index, option)}
                          className={`p-3 rounded-lg text-left transition ${
                            correct
                              ? "bg-green-700"
                              : wrong
                              ? "bg-red-700"
                              : selected
                              ? "bg-blue-700"
                              : "bg-zinc-800 hover:bg-zinc-700"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!quizChecked && (
              <button
                onClick={checkQuiz}
                disabled={!allQuestionsAnswered}
                className={`mt-6 px-6 py-3 rounded-xl font-bold ${
                  allQuestionsAnswered
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-zinc-700 cursor-not-allowed"
                }`}
              >
                Check Quiz
              </button>
            )}

            {quizChecked && (
              <div className="mt-6 bg-zinc-900 p-5 rounded-xl">
                <p className="text-xl font-bold">
                  Score: {score}%
                </p>

                {passed ? (
                  <p className="text-green-400 mt-2">
                    Great work. You passed this lesson.
                  </p>
                ) : (
                  <p className="text-red-400 mt-2">
                    You need 70% to pass. Review the lesson and try again.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Complete Lesson */}
          <div className="flex gap-4">
            <button
              onClick={completeLesson}
              disabled={!passed}
              className={`px-6 py-3 rounded-xl font-bold ${
                passed
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-zinc-700 cursor-not-allowed"
              }`}
            >
              Complete Lesson
            </button>

            <Link
              href="/lessons"
              className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl font-bold"
            >
              Back to Lessons
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}