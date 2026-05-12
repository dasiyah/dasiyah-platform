"use client";

import { getSubscription } from "@/lib/getSubscription";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";

type Lesson = {
  title: string;
  slug: string;
  description: string;
  level: string;
  premium: boolean;
};

type LessonProgress = {
  lesson_slug: string;
  lesson_title: string;
  completed: boolean;
  score: number;
};

export default function LessonsPage() {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const lessons: Lesson[] = [
    {
      title: "Basic IT English",
      slug: "basic-it-english",
      description:
        "Learn essential English used in tech, including common terms, simple explanations, and workplace vocabulary.",
      level: "Beginner",
      premium: false,
    },
    {
      title: "Talking to a Client",
      slug: "talking-to-a-client",
      description:
        "Learn how to communicate with clients and solve basic IT problems.",
      level: "Beginner",
      premium: true,
    },
    {
      title: "Meetings & Communication",
      slug: "meetings-communication",
      description:
        "Practice speaking clearly in meetings, giving updates, asking questions, and responding professionally.",
      level: "Intermediate",
      premium: false,
    },
    {
      title: "Explaining Technical Problems",
      slug: "explaining-technical-problems",
      description:
        "Learn how to describe bugs, outages, slow systems, and other technical issues in clear English.",
      level: "Advanced",
      premium: true,
    },
    {
      title: "Advanced Client Support",
      slug: "advanced-client-support",
      description:
        "Handle more difficult client conversations and support situations.",
      level: "Advanced",
      premium: true,
    },
  ];

  useEffect(() => {
    const loadProgress = async () => {
  const subscription = await getSubscription();
  setIsSubscribed(subscription === "premium");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_slug, lesson_title, completed, score")
        .eq("user_id", user.id);

      if (error) {
        console.error("Lessons progress error:", error.message);
      }

      const completed = (data || [])
        .filter((item) => item.completed)
        .map((item) => item.lesson_slug);

      setProgress(data || []);
      setCompletedSlugs(completed);
      setLoading(false);
    };

    loadProgress();
  }, []);

  const completedCount = completedSlugs.length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const isLevelComplete =
    completedSlugs.includes("basic-it-english") &&
    completedSlugs.includes("talking-to-a-client") &&
    completedSlugs.includes("advanced-client-support");

  const getLessonScore = (slug: string) => {
    const lesson = progress.find((item) => item.lesson_slug === slug);
    return lesson?.score ?? null;
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">
          Lesson Modules
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Your progress is now saved to your Dasiyah account.
        </p>

        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-sm text-gray-400 mb-2">Current Plan</p>

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
          <p className="text-gray-400 mb-2">Progress:</p>

          <div className="w-full bg-gray-800 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {completedCount} / {lessons.length} lessons completed
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-400 mb-10">
            Loading lesson progress...
          </p>
        )}

        {isLevelComplete && (
          <div className="max-w-3xl mx-auto mb-10 p-6 bg-green-900 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              🎉 Level 1 Complete!
            </h2>
            <p className="text-gray-300">
              You’ve completed all core lessons. More advanced content is now
              available.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {lessons.map((lesson) => {
            const locked = lesson.premium && !isSubscribed;
            const completed = completedSlugs.includes(lesson.slug);
            const score = getLessonScore(lesson.slug);

            return (
              <Link
                key={lesson.slug}
                href={locked ? "/upgrade" : `/lessons/${lesson.slug}`}
              >
                <div
                  className={`p-6 rounded-xl shadow-md transition cursor-pointer h-full ${
                    locked
                      ? "bg-gray-800 opacity-70"
                      : "bg-gray-900 hover:shadow-lg"
                  }`}
                >
                  <h2 className="text-2xl font-semibold text-green-400">
                    {lesson.title}
                  </h2>

                  {completed && (
                    <p className="mt-2 text-sm text-green-400 font-medium">
                      ✅ Completed
                    </p>
                  )}

                  {score !== null && (
                    <p className="mt-1 text-sm text-gray-400">
                      Score: {score}
                    </p>
                  )}

                  {locked && (
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
            );
          })}
        </div>
      </main>
    </ProtectedRoute>
  );
}