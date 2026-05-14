"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function AppNotOpeningLesson() {
  const questions = [
    {
      question: "What is a common solution when an app will not open?",
      options: [
        "Restart the application",
        "Increase speaker volume",
        "Delete the keyboard",
        "Disconnect the monitor",
      ],
      answer: "Restart the application",
    },
    {
      question: "What does 'crash' mean?",
      options: [
        "Application suddenly stops working",
        "Internet gets faster",
        "Printer becomes louder",
        "Battery fully charged",
      ],
      answer: "Application suddenly stops working",
    },
    {
      question: "Why might an app fail to open?",
      options: [
        "Compatibility problems",
        "Clean desk",
        "Bright wallpaper",
        "Printer paper jam",
      ],
      answer: "Compatibility problems",
    },
  ];

  async function completeLesson() {
    await saveLessonProgress({
      lessonSlug: "app-not-opening",
      lessonTitle: "App Not Opening",
      completed: true,
      score: 100,
    });

    alert("Lesson Completed!");
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-bold mb-6">
            App Not Opening
          </h1>

          <p className="text-gray-300 mb-8">
            Learn how IT support workers troubleshoot applications that fail to launch properly.
          </p>

          {/* Vocabulary */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Vocabulary
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Crash</h3>
                <p>When an application suddenly stops working.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Install</h3>
                <p>To add software onto a computer.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Update</h3>
                <p>A newer version of software.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Compatibility</h3>
                <p>Whether software works correctly with a system.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Permissions</h3>
                <p>Access rights required to use software.</p>
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
                “Please restart the application.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “The software may need an update.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “The app appears to be crashing.”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Check if you have the correct permissions.”
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
                A customer says their application closes immediately after opening.
              </p>

              <p className="mb-2">
                Support: “The app may need an update.”
              </p>

              <p className="mb-2">
                Customer: “Should I reinstall it?”
              </p>

              <p>
                Support: “Yes, reinstalling may fix the issue.”
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
                    {q.options.map((option) => (
                      <button
                        key={option}
                        className="bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-lg text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Complete Lesson */}
          <div className="flex gap-4">

            <button
              onClick={completeLesson}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
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