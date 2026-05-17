"use client";

import AuthStatus from "./AuthStatus";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-6 border-b border-gray-800 bg-black text-white">
      <div className="flex items-center gap-3">
  <img
    src="/favicon.png"
    alt="Dasiyah Logo"
    className="w-8 h-8"
  />

  <div className="text-2xl font-bold text-green-400">
    Dasiyah
  </div>
</div>

      <div className="flex items-center gap-8">
        <div className="flex gap-6 text-gray-400">
          <a href="/" className="hover:text-white transition">
            Home
          </a>

          <a href="/dashboard" className="hover:text-white transition">
            Dashboard
          </a>

          <a href="/vocabulary" className="hover:text-white transition">
            Vocabulary
          </a>

          <a href="/lessons" className="hover:text-white transition">
            Lessons
          </a>

          <a href="/upgrade" className="hover:text-white transition">
            Upgrade
          </a>
        </div>

        <AuthStatus />
      </div>
    </nav>
  );
}