import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import BusinessList from '../components/BusinessList'
import businessAPI from '../services/businessAPI'

export default function Home() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [city, setCity] = useState('')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCategories()
    fetchBusinesses()
  }, [search, category, city, page])

  const fetchCategories = async () => {
    try {
      const response = await businessAPI.getCategories()
      setCategories(response.data.data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchBusinesses = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await businessAPI.searchBusinesses(search, category, city, page, 9)
      setBusinesses(response.data.data)
      setTotalPages(response.data.pages)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch businesses')
      setBusinesses([])
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <SearchBar
          onSearch={setSearch}
          onCategoryChange={setCategory}
          onCityChange={setCity}
          categories={categories}
        />

        <BusinessList businesses={businesses} loading={loading} error={error} />

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-2 rounded-lg ${
                    page === p
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
