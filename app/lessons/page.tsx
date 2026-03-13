export default function LessonsPage() {

  const lessons = [
    {
      title: "Network Basics",
      description: "Learn how to explain IP addresses, routers, and network issues in English."
    },
    {
      title: "Servers & Infrastructure",
      description: "Understand server terminology and how to discuss hosting environments."
    },
    {
      title: "Troubleshooting Conversations",
      description: "Practice explaining technical problems to clients and coworkers."
    },
    {
      title: "Client Communication",
      description: "Learn how to speak professionally with international clients."
    },
    {
      title: "IT Job Interviews",
      description: "Prepare for technical interviews in English."
    }
  ];

  return (
    <main className="p-12">

      <h1 className="text-4xl font-bold mb-10">
        Lesson Modules
      </h1>

      <div className="grid gap-6">

        {lessons.map((lesson, index) => (

          <div
            key={index}
            className="border border-gray-700 rounded-xl p-6 hover:border-green-400 transition"
          >

            <h2 className="text-2xl font-semibold">
              {lesson.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {lesson.description}
            </p>

          </div>

        ))}

      </div>

    </main>
  )
}