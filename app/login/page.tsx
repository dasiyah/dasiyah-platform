"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("✅ Login successful");

    setTimeout(() => {
      router.push("/lessons");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl">
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          Dasiyah Login
        </h1>

        <p className="text-gray-400 mb-8">
          Continue your IT-English training.
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 text-black font-semibold py-4 rounded-lg hover:bg-green-400 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p className="text-sm text-center text-gray-300">
              {message}
            </p>
          )}

          <button
            onClick={() => router.push("/signup")}
            className="w-full bg-gray-800 py-4 rounded-lg hover:bg-gray-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}