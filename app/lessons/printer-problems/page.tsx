"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function PrinterProblemsLesson() {
  const questions = [
    {
      question: "What causes a printer jam?",
      options: [
        "Paper stuck inside",
        "Internet speed",
        "Low speaker volume",
        "Keyboard damage",
      ],
      answer: "Paper stuck inside",
    },
    {
      question: "What is toner used for?",
      options: [
        "Internet connection",
        "Printing documents",
        "Charging laptops",
        "Video calls",
      ],
      answer: "Printing documents",
    },
    {
      question: "What does 'printer offline' mean?",
      options: [
        "Printer disconnected",
        "Printer is too loud",
        "Printer is overheating",
        "Printer battery is full",
      ],
      answer: "Printer disconnected",
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
      lessonSlug: "printer-problems",
      lessonTitle: "Printer Problems",
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
            Printer Problems
          </h1>

          <p className="text-gray-300 mb-8">
            Learn how IT support workers troubleshoot common printer issues in the workplace.
          </p>

          {/* Vocabulary */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Vocabulary
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Paper Jam</h3>
                <p>Paper stuck inside the printer.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Toner</h3>
                <p>Powder used for printing documents.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Offline</h3>
                <p>Disconnected or unavailable.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Queue</h3>
                <p>A list of pending print jobs.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Reconnect</h3>
                <p>To connect the printer again.</p>
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
                “The printer appears to be offline.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Please remove the paper jam carefully.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Try restarting the printer.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Clear the print queue and try again.”
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
                A customer says their printer stopped printing documents.
              </p>

              <p className="mb-2">
                Support: “The printer appears to be offline.”
              </p>

              <p className="mb-2">
                Customer: “What should I do?”
              </p>

              <p>
                Support: “Please restart the printer and reconnect it.”
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