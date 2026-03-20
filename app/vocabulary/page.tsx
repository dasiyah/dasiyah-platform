"use client";

import { useState } from "react";

export default function VocabularyPage() {

  const terms = [
  {
    term: "API",
    definition: "A way for software systems to communicate with each other.",
    example: "The mobile app uses an API to get data from the server.",
    level: "Beginner"
  },
  {
    term: "DNS",
    definition: "A system that translates domain names into IP addresses.",
    example: "DNS helps your browser find the correct website.",
    level: "Intermediate"
  },
  {
    term: "Firewall",
    definition: "A security system that monitors and controls network traffic.",
    example: "The firewall blocked suspicious incoming traffic.",
    level: "Intermediate"
  },
  {
    term: "Server",
    definition: "A computer that provides data or services to other computers.",
    example: "The website is hosted on a cloud server.",
    level: "Beginner"
  },
  {
    term: "Latency",
    definition: "The delay between a request and response in a network.",
    example: "High latency can make video calls lag.",
    level: "Advanced"
  },
];

  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

const [selectedLevel, setSelectedLevel] = useState("All");

  return (
  <main className="min-h-screen bg-black text-white px-6 py-12">

    <h1 className="text-4xl font-bold text-center mb-12">
      IT Vocabulary
    </h1>
    <div className="flex justify-center gap-4 mb-10">
  {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
    <button
      key={level}
      onClick={() => setSelectedLevel(level)}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        selectedLevel === level
          ? "bg-green-500 text-black"
          : "bg-gray-800 text-gray-300"
      }`}
    >
      {level}
    </button>
  ))}
</div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      
      {terms
  .filter((item) =>
    selectedLevel === "All" ? true : item.level === selectedLevel
  )
  .map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          onClick={() =>
            setRevealedIndex(revealedIndex === index ? null : index)
          }
        >
          <h2 className="text-xl font-semibold text-green-400">
            {item.term}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
  {item.level}
</p>

          {revealedIndex === index && (
  <>
    <p className="mt-4 text-gray-300">
      {item.definition}
    </p>

    <p className="mt-3 text-sm text-gray-500">
  Example:
</p>

<p className="text-sm text-gray-400 italic">
  “{item.example}”
</p>
  </>
)}

          <p className="mt-4 text-sm text-gray-500">
  {revealedIndex === index ? "Click to hide" : "Click to reveal meaning"}
</p>
        </div>
      ))}

    </div>

  </main>
);
}