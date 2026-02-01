export default function SearchBar({ onSearch, onCategoryChange, onCityChange, categories }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value)
  }

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value)
  }

  const handleCityChange = (e) => {
    onCityChange(e.target.value)
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Find Businesses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name or description..."
          onChange={handleSearchChange}
          className="px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          onChange={handleCategoryChange}
          className="px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by city..."
          onChange={handleCityChange}
          className="px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    </div>
  )
}
