import { supabase } from "./supabase";

export async function saveLessonProgress({
  lessonSlug,
  lessonTitle,
  completed,
  score,
}: {
  lessonSlug: string;
  lessonTitle: string;
  completed: boolean;
  score: number;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("lesson_progress")
    .upsert({
      user_id: user.id,
      lesson_slug: lessonSlug,
      lesson_title: lessonTitle,
      completed,
      score,
    });

  if (error) {
    console.error("Save progress error:", error.message);
  }
}