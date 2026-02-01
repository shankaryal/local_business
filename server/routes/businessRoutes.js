import express from 'express'
import Business from '../models/Business.js'

const router = express.Router()

// Get all businesses with filtering and search
router.get('/', async (req, res) => {
  try {
    const { search, category, city, page = 1, limit = 10 } = req.query

    let query = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ]
    }

    if (category && category !== 'All') {
      query.category = category
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }

    const skip = (page - 1) * limit
    const total = await Business.countDocuments(query)
    const businesses = await Business.find(query)
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: businesses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// Get single business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      })
    }
    res.status(200).json({
      success: true,
      data: business,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// Create new business
router.post('/', async (req, res) => {
  try {
    const business = new Business(req.body)
    await business.save()
    res.status(201).json({
      success: true,
      message: 'Business created successfully',
      data: business,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

// Update business
router.put('/:id', async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Business updated successfully',
      data: business,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

// Delete business
router.delete('/:id', async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id)

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Business deleted successfully',
      data: business,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// Get categories
router.get('/meta/categories', (req, res) => {
  const categories = ['All', 'Retail', 'Technology', 'Food & Beverage', 'Healthcare', 'Professional Services', 'Other']
  res.status(200).json({
    success: true,
    data: categories,
  })
})

export default router
