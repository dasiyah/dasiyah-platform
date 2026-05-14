"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function HelpingCustomerStepByStepLesson() {
  const questions = [
    {
      question: "Why do IT workers give step-by-step instructions?",
      options: [
        "To guide users clearly",
        "To increase internet speed",
        "To decorate computers",
        "To clean printers",
      ],
      answer: "To guide users clearly",
    },
    {
      question: "What is a common support instruction?",
      options: [
        "Open the settings menu",
        "Change your wallpaper",
        "Increase speaker volume",
        "Buy a new keyboard",
      ],
      answer: "Open the settings menu",
    },
    {
      question: "Why is clear communication important in support?",
      options: [
        "It helps users follow instructions",
        "It changes internet providers",
        "It increases storage automatically",
        "It repairs monitors physically",
      ],
      answer: "It helps users follow instructions",
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

    const finalScore = Math.round(
      (correct / questions.length) * 100
    );

    setScore(finalScore);
    setQuizChecked(true);
  }

  async function completeLesson() {
    await saveLessonProgress({
      lessonSlug: "helping-a-customer-step-by-step",
      lessonTitle: "Helping a Customer Step-by-Step",
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
            Helping a Customer Step-by-Step
          </h1>

          <p className="text-gray-300 mb-8">
            Learn how IT support workers guide customers through technical
            solutions step-by-step.
          </p>

          {/* Vocabulary */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Vocabulary
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Instructions</h3>
                <p>Directions explaining what to do.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Settings</h3>
                <p>System options used to configure a device or app.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Select</h3>
                <p>To choose an option.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Confirm</h3>
                <p>To approve or verify something.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Continue</h3>
                <p>To move forward to the next step.</p>
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
                “Please open the settings menu.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Now select the network option.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Click continue to proceed.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Please confirm the changes.”
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
                A customer needs help reconnecting to WiFi.
              </p>

              <p className="mb-2">
                Support: “Please open the settings menu.”
              </p>

              <p className="mb-2">
                Customer: “Okay, I see it.”
              </p>

              <p>
                Support: “Now select the network option and reconnect to WiFi.”
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
                      const selected =
                        selectedAnswers[index] === option;

                      const correct =
                        quizChecked && option === q.answer;

                      const wrong =
                        quizChecked &&
                        selected &&
                        option !== q.answer;

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            selectAnswer(index, option)
                          }
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