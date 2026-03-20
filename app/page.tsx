import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Dasiyah
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl text-green-400">
          English for Tech
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl">
          Learn real English used by developers, engineers, and IT professionals.
          Speak confidently in meetings, interviews, and global teams.
        </p>

        <Link
  href="/vocabulary"
  className="mt-10 inline-block px-8 py-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
>
  Start Learning
</Link>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-xl font-semibold">Vocabulary</h3>
            <p className="mt-2 text-gray-400">
              Learn essential IT terms like API, backend, and deployment.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Lessons</h3>
            <p className="mt-2 text-gray-400">
              Practice real-world English used in tech jobs and meetings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Fluency</h3>
            <p className="mt-2 text-gray-400">
              Build confidence speaking English in professional environments.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Tech English Journey Today
        </h2>

        <button className="mt-8 px-8 py-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition">
          Book a Lesson
        </button>
      </section>

    </main>
  );
}