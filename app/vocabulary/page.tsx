"use client";

import { useState } from "react";

export default function VocabularyPage() {

  const terms = [
    { term: "API", definition: "A way for software systems to communicate with each other." },
    { term: "DNS", definition: "A system that translates domain names into IP addresses." },
    { term: "Firewall", definition: "A security system that monitors and controls network traffic." },
    { term: "Server", definition: "A computer that provides data or services to other computers." },
    { term: "Latency", definition: "The delay between a request and response in a network." },
  ];

  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <main className="p-12">

      <h1 className="text-4xl font-bold mb-10">
        IT Vocabulary Flashcards
      </h1>

      <div className="grid gap-6">

        {terms.map((item, index) => (

          <div
            key={index}
            onClick={() =>
              setRevealedIndex(revealedIndex === index ? null : index)
            }
            className="cursor-pointer border border-gray-700 rounded-xl p-6 hover:border-green-400 transition"
          >

            <h2 className="text-2xl font-semibold">
              {item.term}
            </h2>

            {revealedIndex === index && (
              <p className="text-gray-400 mt-3">
                {item.definition}
              </p>
            )}

          </div>

        ))}

      </div>

    </main>
  );
}