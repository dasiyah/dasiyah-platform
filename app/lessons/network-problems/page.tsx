"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "What does 'network issue' mean?",
    options: [
      "Internet connection problem",
      "Printer has paper",
      "Monitor brightness",
      "Keyboard layout",
    ],
    answer: "Internet connection problem",
  },
  {
    question: "What device provides internet access?",
    options: [
      "Router",
      "Mousepad",
      "Speaker",
      "Printer",
    ],
    answer: "Router",
  },
  {
    question: "What can cause slow internet?",
    options: [
      "Weak Wi-Fi signal",
      "Clean desktop",
      "Bright wallpaper",
      "Volume settings",
    ],
    answer: "Weak Wi-Fi signal",
  },
  {
    question: "What does 'disconnect' mean?",
    options: [
      "Lose connection",
      "Increase speed",
      "Open settings",
      "Charge battery",
    ],
    answer: "Lose connection",
  },
  {
    question: "What helps fix network problems?",
    options: [
      "Restarting the router",
      "Changing wallpaper",
      "Cleaning keyboard",
      "Turning off monitor",
    ],
    answer: "Restarting the router",
  },
  {
    question: "What does Wi-Fi do?",
    options: [
      "Connects devices to the internet",
      "Prints documents",
      "Charges phones",
      "Controls speakers",
    ],
    answer: "Connects devices to the internet",
  },
];

export default function NetworkProblemsLesson() {
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
          Network Problems
        </h1>

        <p className="text-gray-400 mb-10">
          Learn common networking and internet support vocabulary.
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