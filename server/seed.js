import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Business from './models/Business.js'

dotenv.config()

const seedData = [
  {
    name: 'Tech Solutions Ltd',
    email: 'info@techsolutions.com',
    phone: '2071234567',
    category: 'Technology',
    address: '123 Silicon Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    description:
      'Leading technology solutions provider offering custom software development, cloud services, and IT consulting.',
    website: 'https://techsolutions.com',
    rating: 4.5,
    reviews: 128,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  },
  {
    name: 'The Daily Brew Coffee Shop',
    email: 'contact@dailybrew.co.uk',
    phone: '2079876543',
    category: 'Food & Beverage',
    address: '456 Oxford Street',
    city: 'London',
    postcode: 'W1D 1AN',
    description:
      'Premium coffee shop serving specialty espresso drinks, freshly baked pastries, and a cozy atmosphere for work or meetings.',
    website: 'https://dailybrew.co.uk',
    rating: 4.8,
    reviews: 324,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1495474472645-4d71bcdd2085?w=400&h=300&fit=crop',
  },
  {
    name: 'Wellness Medical Center',
    email: 'appointments@wellnessmc.com',
    phone: '2012345678',
    category: 'Healthcare',
    address: '789 Health Avenue',
    city: 'Manchester',
    postcode: 'M1 1AA',
    description:
      'State-of-the-art medical facility providing comprehensive healthcare services including general practice, diagnostics, and specialist consultations.',
    website: 'https://wellnessmc.com',
    rating: 4.6,
    reviews: 256,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop',
  },
  {
    name: 'Fashion Forward Boutique',
    email: 'shop@fashionforward.co.uk',
    phone: '1612345678',
    category: 'Retail',
    address: '321 Style Lane',
    city: 'Birmingham',
    postcode: 'B1 1AA',
    description:
      'Trendy boutique featuring curated collections of high-end fashion, accessories, and seasonal collections from renowned designers.',
    website: 'https://fashionforward.co.uk',
    rating: 4.4,
    reviews: 189,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    name: 'Legal Experts Associates',
    email: 'legal@legalexperts.co.uk',
    phone: '2033456789',
    category: 'Professional Services',
    address: '654 Law Street',
    city: 'London',
    postcode: 'EC1A 1BB',
    description:
      'Experienced law firm specializing in corporate law, litigation, intellectual property, and commercial contracts.',
    website: 'https://legalexperts.co.uk',
    rating: 4.7,
    reviews: 95,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
  {
    name: 'Green Garden Landscaping',
    email: 'inquiry@greengarden.com',
    phone: '1215678901',
    category: 'Professional Services',
    address: '987 Park Road',
    city: 'Bristol',
    postcode: 'BS1 1AA',
    description:
      'Professional landscaping and garden design services for residential and commercial properties with sustainable practices.',
    website: 'https://greengarden.com',
    rating: 4.3,
    reviews: 67,
    isVerified: false,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
  },
  {
    name: 'Digital Marketing Pro',
    email: 'hello@digitalmktpro.com',
    phone: '2023456789',
    category: 'Technology',
    address: '234 Digital Plaza',
    city: 'London',
    postcode: 'N1 1AA',
    description:
      'Full-service digital marketing agency specializing in SEO, PPC, social media marketing, and content strategy.',
    website: 'https://digitalmktpro.com',
    rating: 4.5,
    reviews: 142,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1460925895917-aaf4cab0c90f?w=400&h=300&fit=crop',
  },
  {
    name: 'Fresh Organic Market',
    email: 'store@freshorganic.co.uk',
    phone: '1913456789',
    category: 'Retail',
    address: '567 Farmers Market',
    city: 'Edinburgh',
    postcode: 'EH1 1AA',
    description:
      'Specialty organic market offering locally sourced produce, natural products, and sustainable grocery options.',
    website: 'https://freshorganic.co.uk',
    rating: 4.6,
    reviews: 198,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
  },
  {
    name: 'Premium Fitness Studio',
    email: 'membership@premiumfitness.com',
    phone: '1212345678',
    category: 'Other',
    address: '890 Gym Street',
    city: 'Leeds',
    postcode: 'LS1 1AA',
    description:
      'Modern fitness center with state-of-the-art equipment, personal training, group classes, and wellness programs.',
    website: 'https://premiumfitness.com',
    rating: 4.4,
    reviews: 213,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
  },
  {
    name: 'Artisan Bakery & Cafe',
    email: 'orders@artisanbakery.co.uk',
    phone: '1613456789',
    category: 'Food & Beverage',
    address: '111 Baker Lane',
    city: 'Manchester',
    postcode: 'M4 1AA',
    description:
      'Traditional artisan bakery producing fresh bread, pastries, and desserts daily with premium ingredients and time-honored techniques.',
    website: 'https://artisanbakery.co.uk',
    rating: 4.7,
    reviews: 287,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uk-business-directory')
    console.log('✓ MongoDB Connected')

    // Clear existing data
    await Business.deleteMany({})
    console.log('✓ Cleared existing businesses')

    // Insert seed data
    const result = await Business.insertMany(seedData)
    console.log(`✓ Added ${result.length} businesses to database`)

    // Display summary
    const total = await Business.countDocuments()
    const byCategory = await Business.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    console.log('\nDatabase Summary:')
    console.log(`Total Businesses: ${total}`)
    console.log('\nBy Category:')
    byCategory.forEach((cat) => {
      console.log(`  ${cat._id}: ${cat.count}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding Error:', error.message)
    process.exit(1)
  }
}

seedDatabase()
