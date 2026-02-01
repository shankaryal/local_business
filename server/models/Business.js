import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10,}$/, 'Please provide a valid phone number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Retail', 'Technology', 'Food & Beverage', 'Healthcare', 'Professional Services', 'Other'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    postcode: {
      type: String,
      required: [true, 'Postcode is required'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Business',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Business', businessSchema)
