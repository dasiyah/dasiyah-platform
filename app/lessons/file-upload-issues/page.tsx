"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function FileUploadIssuesLesson() {
  const questions = [
    {
      question: "Why might a file fail to upload?",
      options: [
        "Internet connection problem",
        "Printer paper jam",
        "Low speaker volume",
        "Bright wallpaper",
      ],
      answer: "Internet connection problem",
    },
    {
      question: "What does file size mean?",
      options: [
        "How large a file is",
        "Monitor brightness",
        "Keyboard layout",
        "Speaker quality",
      ],
      answer: "How large a file is",
    },
    {
      question: "What is a common solution for upload problems?",
      options: [
        "Try uploading again",
        "Disconnect the monitor",
        "Increase speaker volume",
        "Delete the browser",
      ],
      answer: "Try uploading again",
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
      lessonSlug: "file-upload-issues",
      lessonTitle: "File Upload Issues",
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
            File Upload Issues
          </h1>

          <p className="text-gray-300 mb-8">
            Learn how IT support workers troubleshoot file upload and attachment problems.
          </p>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Vocabulary
            </h2>

            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Upload</h3>
                <p>To send a file from your device to a website or system.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Attachment</h3>
                <p>A file added to an email or message.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">File Size</h3>
                <p>The amount of storage space a file uses.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Browser</h3>
                <p>An application used to access websites.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Cloud Storage</h3>
                <p>Online storage used to save and share files.</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Core Phrases
            </h2>

            <div className="space-y-3">
              <div className="bg-zinc-900 p-4 rounded-xl">
                “The file may be too large to upload.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Please try uploading the file again.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Check your internet connection.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Try using a different browser.”
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Real-World Scenario
            </h2>

            <div className="bg-zinc-900 p-6 rounded-xl">
              <p className="mb-4">
                A customer cannot upload a document to a website.
              </p>

              <p className="mb-2">
                Support: “The file may be too large.”
              </p>

              <p className="mb-2">
                Customer: “What should I do?”
              </p>

              <p>
                Support: “Please try uploading again using a different browser.”
              </p>
            </div>
          </div>

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