"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function LessonsPage() {
 const [completedLessons, setCompletedLessons] = useState<string[]>([]);
 const [isSubscribed, setIsSubscribed] = useState(false);
 useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("completedLessons") || "[]");
  setCompletedLessons(saved);
  
  const subscribed = localStorage.getItem("isSubscribed") === "true";
setIsSubscribed(subscribed);
}, []);
  const isLevelComplete =
  completedLessons.includes("Basic IT English") &&
  completedLessons.includes("Talking to a Client") &&
  completedLessons.includes("Advanced Client Support");
  const lessons = [
    
 {
  title: "Advanced Client Support",
  description: "Handle more difficult client conversations and support situations.",
  level: "Advanced",
  locked: !isSubscribed,
},
  {
    title: "Basic IT English",
    description: "Learn essential English used in tech, including common terms, simple explanations, and workplace vocabulary.",
    level: "Beginner",
    locked: false,
  },
  {
    title: "Meetings & Communication",
    description: "Practice speaking clearly in meetings, giving updates, asking questions, and responding professionally.",
    level: "Intermediate",
    locked: false,
  },
  {
  title: "Explaining Technical Problems",
  description: "Learn how to describe bugs, outages, slow systems, and other technical issues in clear English.",
  level: "Advanced",
  locked: !isSubscribed,
},
{
  title: "Talking to a Client",
  description: "Learn how to communicate with clients and solve basic IT problems.",
  level: "Beginner",
  locked: !isSubscribed,
},
];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Lesson Modules
      </h1>

      <div className="max-w-3xl mx-auto mb-8 text-center">
  <p className="text-sm text-gray-400 mb-2">
    Current Plan
  </p>

  <p
    className={`inline-block px-5 py-2 rounded-full font-semibold ${
      isSubscribed
        ? "bg-green-500 text-black"
        : "bg-gray-800 text-gray-300"
    }`}
  >
    {isSubscribed ? "Premium Access" : "Free Plan"}
  </p>

  {!isSubscribed && (
  <Link
    href="/upgrade"
    className="text-sm text-green-400 mt-3 inline-block hover:underline"
  >
    Upgrade to unlock all lessons →
  </Link>
)}
</div>

      <div className="max-w-3xl mx-auto mb-10">
  <p className="text-gray-400 mb-2">
    Progress:
  </p>

  <div className="w-full bg-gray-800 rounded-full h-4">
    <div
      className="bg-green-500 h-4 rounded-full transition-all"
      style={{
        width: `${
          (completedLessons.length / lessons.length) * 100
        }%`,
      }}
    ></div>
  </div>

  <p className="text-sm text-gray-500 mt-2">
    {completedLessons.length} / {lessons.length} lessons completed
  </p>

  <button
    onClick={() => {
      localStorage.removeItem("completedLessons");
      window.location.reload();
    }}
    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
  >
    Reset Progress
  </button>
</div>
{isLevelComplete && (
  <div className="max-w-3xl mx-auto mb-10 p-6 bg-green-900 rounded-xl text-center">
    <h2 className="text-2xl font-bold text-green-400 mb-2">
      🎉 Level 1 Complete!
    </h2>
    <p className="text-gray-300">
      You’ve completed all core lessons. More advanced content is now available.
    </p>
  </div>
)}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {lessons.map((lesson, index) => (
  <Link
  key={index}
  href={
    lesson.locked
      ? "/upgrade"
      : `/lessons/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`
  }
>
   <div
  className={`p-6 rounded-xl shadow-md transition cursor-pointer ${
    lesson.locked
      ? "bg-gray-800 opacity-70"
      : "bg-gray-900 hover:shadow-lg"
  }`}
>
      <h2 className="text-2xl font-semibold text-green-400">
        {lesson.title}
      </h2>
      {completedLessons.includes(lesson.title) && (
  <p className="mt-2 text-sm text-green-400 font-medium">
    ✅ Completed
  </p>
)}
      {lesson.locked && (
  <div className="mt-2">
    <p className="text-sm text-yellow-400 font-medium">
      🔒 Locked
    </p>
    <p className="text-xs text-gray-500">
      Upgrade to unlock
    </p>
  </div>
)}

      <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
        {lesson.level}
      </p>

      <p className="text-gray-400 mt-4">
        {lesson.description}
      </p>
    </div>
  </Link>
))}
      </div>
    </main>
  );
}