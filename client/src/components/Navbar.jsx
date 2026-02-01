export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          🏢 UK Business Directory
        </a>
        <div className="space-x-6">
          <a href="/" className="hover:text-blue-200 transition-colors">
            Home
          </a>
          <a href="/add-business" className="hover:text-blue-200 transition-colors">
            Add Business
          </a>
        </div>
      </div>
    </nav>
  )
}
