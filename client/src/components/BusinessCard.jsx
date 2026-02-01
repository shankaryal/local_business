import { Link } from 'react-router-dom'

export default function BusinessCard({ business }) {
  return (
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
          {business.isVerified && (
            <span className="text-green-600 font-semibold text-sm">✓ Verified</span>
          )}
        </div>

        <div className="flex items-center mb-4">
          <span className="text-yellow-400">★</span>
          <span className="ml-2 text-gray-700 font-semibold">{business.rating.toFixed(1)}</span>
          <span className="ml-2 text-gray-500 text-sm">({business.reviews} reviews)</span>
        </div>

        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>📍 {business.city}, {business.postcode}</p>
          <p>📞 {business.phone}</p>
          {business.website && (
            <p>
              🌐{' '}
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </p>
          )}
        </div>

        <Link
          to={`/business/${business._id}`}
          className="block w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition-colors font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
