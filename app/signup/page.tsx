"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          subscription: "free",
        },
        {
          onConflict: "id",
        }
      );

      if (profileError) {
        setMessage(profileError.message);
        setLoading(false);
        return;
      }
    }

    setMessage("✅ Account created. Check your email if confirmation is required.");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl">
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 mb-8">
          Start your Dasiyah IT-English training.
        </p>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-4 rounded-lg hover:bg-green-400 transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {message && (
            <p className="text-sm text-center text-gray-300">
              {message}
            </p>
          )}

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-gray-800 py-4 rounded-lg hover:bg-gray-700 transition"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </main>
  );
}