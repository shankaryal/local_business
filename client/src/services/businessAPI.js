import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Business API calls
const businessAPI = {
  // Get all businesses with filters and pagination
  getBusinesses: (params = {}) => {
    return apiClient.get('/businesses', { params })
  },

  // Get single business by ID
  getBusinessById: (id) => {
    return apiClient.get(`/businesses/${id}`)
  },

  // Create new business
  createBusiness: (data) => {
    return apiClient.post('/businesses', data)
  },

  // Update business
  updateBusiness: (id, data) => {
    return apiClient.put(`/businesses/${id}`, data)
  },

  // Delete business
  deleteBusiness: (id) => {
    return apiClient.delete(`/businesses/${id}`)
  },

  // Get categories
  getCategories: () => {
    return apiClient.get('/businesses/meta/categories')
  },

  // Search businesses with multiple filters
  searchBusinesses: (searchTerm = '', category = '', city = '', page = 1, limit = 9) => {
    const params = { page, limit }
    if (searchTerm) params.search = searchTerm
    if (category && category !== 'All') params.category = category
    if (city) params.city = city
    return apiClient.get('/businesses', { params })
  },
}

// Error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

export default businessAPI
