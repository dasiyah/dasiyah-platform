"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "What does 'no internet connection' mean?",
    options: [
      "Device cannot access the internet",
      "Monitor is broken",
      "Keyboard is dirty",
      "Printer has paper",
    ],
    answer: "Device cannot access the internet",
  },
  {
    question: "What device gives Wi-Fi to your home?",
    options: [
      "Router",
      "Mouse",
      "Webcam",
      "Speaker",
    ],
    answer: "Router",
  },
  {
    question: "What is a common fix for internet problems?",
    options: [
      "Restart the router",
      "Change wallpaper",
      "Increase brightness",
      "Clean monitor",
    ],
    answer: "Restart the router",
  },
  {
    question: "What does 'signal' mean in networking?",
    options: [
      "Connection strength",
      "Keyboard shortcut",
      "Battery charger",
      "Printer cable",
    ],
    answer: "Connection strength",
  },
  {
    question: "What can weaken Wi-Fi?",
    options: [
      "Being far from the router",
      "Typing fast",
      "Bright desktop",
      "Volume settings",
    ],
    answer: "Being far from the router",
  },
  {
    question: "What does reconnect mean?",
    options: [
      "Connect again",
      "Turn off monitor",
      "Delete files",
      "Print documents",
    ],
    answer: "Connect again",
  },
];

export default function InternetNotWorkingLesson() {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (questionIndex: number, option: string) => {
    if (showResults) return;

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const score = selectedAnswers.reduce((total, answer, index) => {
    return answer === questions[index].answer ? total + 1 : total;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const passed = percentage >= 70;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Internet Not Working
        </h1>

        <p className="text-gray-400 mb-10">
          Learn useful internet troubleshooting vocabulary and support terms.
        </p>

        <div className="space-y-8">
          {questions.map((q, questionIndex) => (
            <div
              key={questionIndex}
              className="bg-zinc-900 p-6 rounded-2xl"
            >
              <h2 className="text-xl font-semibold mb-4">
                {q.question}
              </h2>

              <div className="space-y-3">
                {q.options.map((option, optionIndex) => {
                  const isSelected =
                    selectedAnswers[questionIndex] === option;

                  const isCorrect =
                    option === q.answer;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() =>
                        handleAnswerClick(questionIndex, option)
                      }
                      className={`w-full text-left p-4 rounded-xl transition-all
                      ${
                        showResults
                          ? isCorrect
                            ? "bg-green-700"
                            : isSelected
                            ? "bg-red-700"
                            : "bg-zinc-800"
                          : isSelected
                          ? "bg-cyan-700"
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

        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            className="mt-10 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-semibold"
          >
            Check Answers
          </button>
        ) : (
          <div className="mt-10">
            <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
              <h2 className="text-3xl font-bold mb-2">
                Score: {percentage}%
              </h2>

              {passed ? (
                <p className="text-green-400 text-lg">
                  You passed the lesson!
                </p>
              ) : (
                <p className="text-red-400 text-lg">
                  You need 70% to pass. Review the lesson and try again.
                </p>
              )}
            </div>

            <div className="flex gap-4">
              {passed && (
                <button
                  onClick={() => {
                    alert("Lesson Completed!");
                  }}
                  className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-semibold"
                >
                  Complete Lesson
                </button>
              )}

              <Link href="/lessons">
                <button className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-xl font-semibold">
                  Back to Lessons
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}