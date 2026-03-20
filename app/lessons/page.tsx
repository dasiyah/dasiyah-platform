import Link from "next/link";
export default function LessonsPage() {
  const lessons = [
    {
      title: "Basic IT English",
      description: "Learn essential English used in tech, including common terms, simple explanations, and workplace vocabulary.",
      level: "Beginner",
    },
    {
      title: "Meetings & Communication",
      description: "Practice speaking clearly in meetings, giving updates, asking questions, and responding professionally.",
      level: "Intermediate",
    },
    {
      title: "Explaining Technical Problems",
      description: "Learn how to describe bugs, outages, slow systems, and other technical issues in clear English.",
      level: "Advanced",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Lesson Modules
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {lessons.map((lesson, index) => (
  <Link
    key={index}
    href={`/lessons/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}
  >
    <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
      <h2 className="text-2xl font-semibold text-green-400">
        {lesson.title}
      </h2>

      <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
        {lesson.level}
      </p>

      <p className="text-gray-400 mt-4">
        {lesson.description}
      </p>
    </div>
  </Link>
))}
      </div>
    </main>
  );
}