export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-6 border-b border-gray-800">

      <div className="text-xl font-semibold">
        IT English Specialist
      </div>

      <div className="flex gap-8 text-gray-400">

        <a href="#" className="hover:text-white transition">
          Home
        </a>

        <a href="#" className="hover:text-white transition">
          Vocabulary
        </a>

        <a href="#" className="hover:text-white transition">
          Lessons
        </a>

        <a href="#" className="hover:text-white transition">
          About
        </a>

        <a href="#" className="hover:text-white transition">
          Contact
        </a>

      </div>

    </nav>
  )
}