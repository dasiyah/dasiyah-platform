"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

type LessonProgress = {
  lesson_slug: string;
  lesson_title: string;
  completed: boolean;
  score: number;
};

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_slug, lesson_title, completed, score")
        .eq("user_id", user.id);

      if (error) {
        console.error("Dashboard progress error:", error.message);
      }

      setProgress(data || []);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  const totalLessons = 5;
  const completedCount = progress.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-green-400 mb-3">
            Student Dashboard
          </h1>

          <p className="text-gray-400 mb-10">
            Welcome back{email ? `, ${email}` : ""}. Continue your IT-English
            training.
          </p>

          {loading ? (
            <p className="text-gray-400">Loading dashboard...</p>
          ) : (
            <>
              <section className="bg-gray-900 rounded-2xl p-8 mb-8">
                <p className="text-gray-400 mb-2">Overall Progress</p>

                <h2 className="text-5xl font-bold text-green-400 mb-4">
                  {progressPercent}%
                </h2>

                <div className="w-full bg-gray-800 rounded-full h-4 mb-3">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className="text-gray-400">
                  {completedCount} / {totalLessons} lessons completed
                </p>
              </section>

              <section className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-900 rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-3">
                    Completed Lessons
                  </h2>

                  {progress.length === 0 ? (
                    <p className="text-gray-400">
                      No completed lessons yet. Start your first lesson.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {progress.map((item) => (
                        <div
                          key={item.lesson_slug}
                          className="bg-gray-800 rounded-xl p-4"
                        >
                          <p className="font-semibold text-green-400">
                            ✅ {item.lesson_title}
                          </p>
                          <p className="text-sm text-gray-400">
                            Score: {item.score}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-gray-900 rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-3">
                    Recommended Next Step
                  </h2>

                  <p className="text-gray-400 mb-6">
                    Continue building your real-world IT support communication
                    skills.
                  </p>

                  <Link
                    href="/lessons"
                    className="inline-block px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </section>

              <section className="bg-gray-900 rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-3">
                  Account Status
                </h2>

                <p className="text-gray-400">
                  Plan:{" "}
                  <span className="text-green-400 font-semibold">
                    Early Access
                  </span>
                </p>
              </section>
            </>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}