export default function MeetingsCommunicationPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Meetings & Communication
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Practice speaking clearly in meetings, giving updates, asking questions, and responding professionally.
        </p>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Lesson Objective</h2>
          <p className="text-gray-300">
            By the end of this lesson, students should be able to communicate clearly during meetings and explain progress in professional English.
          </p>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Phrases</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>I’d like to give a quick update.</li>
            <li>Can you clarify that point?</li>
            <li>We are currently working on that issue.</li>
            <li>I agree with that approach.</li>
            <li>Let’s follow up after the meeting.</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Example Sentences</h2>
          <ul className="space-y-3 text-gray-300">
            <li>“I’d like to give a quick update on the project.”</li>
            <li>“Can you clarify what you mean by deployment timeline?”</li>
            <li>“We are currently working on the login issue.”</li>
            <li>“Let’s follow up after the meeting.”</li>
          </ul>
        </section>

        <section className="bg-gray-900 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Practice Prompt</h2>
          <p className="text-gray-300">
            Try explaining this in English:
          </p>
          <p className="text-gray-400 mt-3 italic">
            “I want to update my team about a bug we are fixing and ask one question before the meeting ends.”
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