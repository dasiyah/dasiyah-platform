"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "Why should you protect your Wi-Fi?",
    options: [
      "To prevent unauthorized access",
      "To increase monitor brightness",
      "To clean the keyboard",
      "To print faster",
    ],
    answer: "To prevent unauthorized access",
  },
  {
    question: "What is a strong Wi-Fi password?",
    options: [
      "A mix of letters, numbers, and symbols",
      "123456",
      "password",
      "wifi",
    ],
    answer: "A mix of letters, numbers, and symbols",
  },
  {
    question: "What does public Wi-Fi mean?",
    options: [
      "Internet anyone can use",
      "Private home network",
      "A printer connection",
      "A computer battery",
    ],
    answer: "Internet anyone can use",
  },
  {
    question: "Why can public Wi-Fi be risky?",
    options: [
      "Hackers may access your data",
      "It cleans your files",
      "It upgrades your monitor",
      "It charges devices slowly",
    ],
    answer: "Hackers may access your data",
  },
  {
    question: "What does secure connection mean?",
    options: [
      "Protected internet connection",
      "Broken router",
      "Slow computer",
      "Low battery",
    ],
    answer: "Protected internet connection",
  },
  {
    question: "What can help improve online security?",
    options: [
      "Using a VPN",
      "Changing wallpaper",
      "Turning off speakers",
      "Cleaning the desk",
    ],
    answer: "Using a VPN",
  },
];

export default function WifiSecurityLesson() {
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
          Wi-Fi Security
        </h1>

        <p className="text-gray-400 mb-10">
          Learn important internet security vocabulary and online safety terms.
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