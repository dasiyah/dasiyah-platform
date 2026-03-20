export default function BasicITLEnglishPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Basic IT English
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Learn foundational English used in technology, support, and software environments.
        </p>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Lesson Objective</h2>
          <p className="text-gray-300">
            By the end of this lesson, students should be able to explain simple IT concepts in English and understand common workplace vocabulary.
          </p>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Vocabulary</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Server</li>
            <li>Network</li>
            <li>Database</li>
            <li>Bug</li>
            <li>Login</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Example Sentences</h2>
          <ul className="space-y-3 text-gray-300">
            <li>“The server is down right now.”</li>
            <li>“I cannot log in to my account.”</li>
            <li>“There is a bug in the application.”</li>
            <li>“The database stores customer information.”</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-semibold mb-4">Practice Prompt</h2>
  <p className="text-gray-300">
    Try explaining this in English:
  </p>
  <p className="text-gray-400 mt-3 italic">
    “My internet is slow, and I cannot connect to the server.”
  </p>
</section>
<div className="flex gap-4 mt-10">
  <a
    href="/lessons"
    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
  >
    Back to Lessons
  </a>

  <a
    href="/vocabulary"
    className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
  >
    Practice Vocabulary
  </a>
</div>
      </div>
    </main>
  );
}