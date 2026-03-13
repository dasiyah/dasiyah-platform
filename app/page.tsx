export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6">

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          English for the Tech Industry
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl">
          Learn the English used by developers, engineers, and IT professionals
          working with global clients.
        </p>

        <button className="mt-10 px-8 py-4 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition">
          Book a Lesson
        </button>

      </section>


      {/* FEATURES SECTION */}
      <section className="py-24 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Technical Vocabulary
          </h3>
          <p className="text-gray-400">
            Master the terminology used in networking, cybersecurity,
            programming, and system administration.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Real Client Scenarios
          </h3>
          <p className="text-gray-400">
            Practice explaining technical problems and communicating clearly
            with international teams.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Career Preparation
          </h3>
          <p className="text-gray-400">
            Prepare for technical interviews, remote work, and global
            technology careers.
          </p>
        </div>

      </section>


      {/* FOOTER */}
      <footer className="text-center py-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} IT English Specialist
      </footer>

    </main>
  )
}