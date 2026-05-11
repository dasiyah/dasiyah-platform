"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthStatus() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
    };

    loadUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setEmail(null);
    router.push("/login");
  };

  if (!email) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold"
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm text-gray-400">{email}</p>
      <button
        onClick={logout}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
      >
        Logout
      </button>
    </div>
  );
}