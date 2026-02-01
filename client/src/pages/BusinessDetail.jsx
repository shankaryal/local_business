import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import businessAPI from '../services/businessAPI'

export default function BusinessDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBusiness()
  }, [id])

  const fetchBusiness = async () => {
    try {
      const response = await businessAPI.getBusinessById(id)
      setBusiness(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load business details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p>{error || 'Business not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back to Search
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{business.name}</h1>
                <p className="text-gray-600">{business.description}</p>
              </div>
              {business.isVerified && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                  ✓ Verified
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Information</h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">Category:</span>{' '}
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {business.category}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">📍 Address:</span> {business.address}
                  </p>
                  <p>
                    <span className="font-semibold">🏙️ City:</span> {business.city}
                  </p>
                  <p>
                    <span className="font-semibold">📮 Postcode:</span> {business.postcode}
                  </p>
                  <p>
                    <span className="font-semibold">📞 Phone:</span>{' '}
                    <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                      {business.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">✉️ Email:</span>{' '}
                    <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
                      {business.email}
                    </a>
                  </p>
                  {business.website && (
                    <p>
                      <span className="font-semibold">🌐 Website:</span>{' '}
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
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ratings & Reviews</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-5xl text-yellow-400">★</span>
                    <div className="ml-4">
                      <p className="text-3xl font-bold text-gray-800">{business.rating.toFixed(1)}</p>
                      <p className="text-gray-600">{business.reviews} reviews</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Added:</span>{' '}
                      {new Date(business.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Last Updated:</span>{' '}
                      {new Date(business.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Business</h2>
              <p className="text-gray-700 leading-relaxed">
                {business.description || 'No additional information available.'}
              </p>
            </div>

            <div className="mt-8 flex space-x-4">
              <a
                href={`tel:${business.phone}`}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition-colors font-semibold"
              >
                📞 Call Now
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg text-center hover:bg-green-700 transition-colors font-semibold"
              >
                ✉️ Email
              </a>
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg text-center hover:bg-purple-700 transition-colors font-semibold"
                >
                  🌐 Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
