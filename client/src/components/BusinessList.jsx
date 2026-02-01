export default function BusinessList({ businesses, loading, error }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error loading businesses</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No businesses found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <div key={business._id}>
          {/* Import BusinessCard component here */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{business.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{business.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {business.category}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>📍 {business.city}</p>
                <p>📞 {business.phone}</p>
              </div>

              <a
                href={`/business/${business._id}`}
                className="block w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition-colors font-semibold"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
