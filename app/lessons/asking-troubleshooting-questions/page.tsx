"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { saveLessonProgress } from "@/lib/saveLessonProgress";

export default function AskingTroubleshootingQuestionsLesson() {
  const questions = [
    {
      question: "Why do IT workers ask troubleshooting questions?",
      options: [
        "To understand the problem",
        "To increase internet speed",
        "To clean devices",
        "To print documents",
      ],
      answer: "To understand the problem",
    },
    {
      question: "What is a useful troubleshooting question?",
      options: [
        "When did the issue start?",
        "What is your favorite color?",
        "How loud are your speakers?",
        "What wallpaper do you use?",
      ],
      answer: "When did the issue start?",
    },
    {
      question: "Why are screenshots helpful?",
      options: [
        "They show the exact issue",
        "They improve battery life",
        "They increase storage",
        "They clean the monitor",
      ],
      answer: "They show the exact issue",
    },
  ];

  async function completeLesson() {
    await saveLessonProgress({
      lessonSlug: "asking-troubleshooting-questions",
      lessonTitle: "Asking Troubleshooting Questions",
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
            Asking Troubleshooting Questions
          </h1>

          <p className="text-gray-300 mb-8">
            Learn how IT support workers ask questions to identify and solve technical problems.
          </p>

          {/* Vocabulary */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Vocabulary
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Issue</h3>
                <p>A problem affecting a device or application.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Describe</h3>
                <p>To explain something in detail.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Screenshot</h3>
                <p>An image showing what appears on a screen.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Error Message</h3>
                <p>A message showing something went wrong.</p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <h3 className="font-bold">Details</h3>
                <p>Important information about a problem.</p>
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
                “When did the issue begin?”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Can you describe the problem?”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “What error message do you see?”
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                “Please send a screenshot if possible.”
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
                A customer says their software is not working correctly.
              </p>

              <p className="mb-2">
                Support: “When did the issue begin?”
              </p>

              <p className="mb-2">
                Customer: “After yesterday’s update.”
              </p>

              <p>
                Support: “Okay, please send a screenshot of the error message.”
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