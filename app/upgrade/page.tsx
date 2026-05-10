"use client";

import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl p-10 text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Speak Real IT English — Not Textbook English
          </h1>

          <p className="text-gray-300 text-lg mb-8">
  Built for developers, IT support, and tech learners who want to communicate clearly in real-world situations — not just pass English tests.
</p>

<p className="text-green-400 text-lg font-medium mb-10">
  👉 Handle clients. Explain problems. Speak confidently in meetings.
</p>

          <div className="grid md:grid-cols-2 gap-6 text-left mb-10">
            <div className="bg-black rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Free Access
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>✅ Basic IT English</li>
                <li>✅ Meetings & Communication</li>
                <li>✅ Progress tracking</li>
                <li>✅ CGA quizzes</li>
              </ul>
            </div>

            <div className="bg-black rounded-xl p-6 border border-green-500">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">
  Premium (What You Actually Need for Real Work)
</h2>
              <ul className="space-y-3 text-gray-300">
                <li>🔓 Talking to a Client</li>
                <li>🔓 Explaining Technical Problems</li>
                <li>🔓 Advanced Client Support</li>
                <li>🔓 More premium lessons coming soon</li>
              </ul>
            </div>
          </div>

          <div className="bg-black rounded-xl p-8 border border-gray-800 mb-8">
            <p className="text-gray-400 mb-2">Premium Plan</p>
            <p className="text-5xl font-bold text-green-400 mb-4">
              $5<span className="text-xl text-gray-400">/month</span>
            </p>
            <p className="text-gray-300">
  Less than a single tutoring session — but designed to build real communication skills you’ll use every day in tech.
</p>
          </div>

          <button
  onClick={() => {
    localStorage.setItem("isSubscribed", "true");
    router.push("/lessons");
    router.refresh();
  }}
  className="px-8 py-4 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition"
>
  Upgrade Now
</button>

          <p className="text-sm text-gray-500 mt-4">
  Early access — more lessons added every month
</p>

          <div className="mt-8">
            <a
              href="/lessons"
              className="text-gray-400 hover:text-white transition"
            >
              ← Back to Lessons
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}