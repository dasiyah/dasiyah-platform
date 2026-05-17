"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Lesson = {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  premium: boolean;
};

type LessonProgress = {
  lesson_slug: string;
  completed: boolean;
};

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [subscription, setSubscription] = useState("free");

  useEffect(() => {
    const loadLessons = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription")
          .eq("id", user.id)
          .single();

        if (profile?.subscription) {
          setSubscription(profile.subscription);
        }

        const { data: progress } = await supabase
          .from("lesson_progress")
          .select("lesson_slug, completed")
          .eq("user_id", user.id)
          .eq("completed", true);

        setCompletedLessons(
          (progress as LessonProgress[] | null)?.map((item) => item.lesson_slug) || []
        );
      }

      const { data } = await supabase
        .from("lessons")
        .select("*")
        .order("id", { ascending: true });

      setLessons(data || []);
    };

    loadLessons();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-green-400 mb-4">
          IT-English Lessons
        </h1>

        <p className="text-gray-400 mb-10">
          Build real-world IT communication skills step-by-step.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => {
            const isPremiumLocked =
              lesson.premium && subscription !== "premium";

            const previousLesson = lessons[index - 1];
            const previousCompleted =
              index === 0 ||
              completedLessons.includes(previousLesson?.slug);

            const isProgressLocked = !previousCompleted;
            const isCompleted = completedLessons.includes(lesson.slug);
            const locked = isPremiumLocked || isProgressLocked;

            return (
              <div
                key={lesson.id}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                    {lesson.level}
                  </span>

                  <div className="flex gap-2">
                    {isCompleted && (
                      <span className="text-sm px-3 py-1 rounded-full bg-green-500 text-black font-semibold">
                        COMPLETED
                      </span>
                    )}

                    {lesson.premium && (
                      <span className="text-sm px-3 py-1 rounded-full bg-yellow-500 text-black font-semibold">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  {lesson.title}
                </h2>

                <p className="text-gray-400 mb-6">
                  {lesson.description}
                </p>

                {isPremiumLocked ? (
                  <button
                    className="w-full bg-gray-700 text-gray-400 py-3 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Premium Required
                  </button>
                ) : isProgressLocked ? (
                  <button
                    className="w-full bg-gray-700 text-gray-400 py-3 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Complete Previous Lesson
                  </button>
                ) : (
                  <Link
                    href={`/lessons/${lesson.slug}`}
                    className="block w-full text-center bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-lg transition"
                  >
                    {isCompleted ? "Review Lesson →" : "Start Lesson →"}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}