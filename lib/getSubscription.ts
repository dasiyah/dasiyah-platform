import { supabase } from "./supabase";

export async function getSubscription() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "free";
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("subscription")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Get subscription error:", error.message);
    return "free";
  }

  return data?.subscription || "free";
}