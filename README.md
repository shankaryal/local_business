# UK Business Directory - MERN Application

A full-stack web application for discovering, listing, and managing UK businesses. Built with React, Node.js, Express, and MongoDB.

## 🎯 Features

- 🔍 **Search & Filter Businesses** - Search by name, category, or city
- 🏢 **Business Listings** - Browse businesses with detailed information
- 📋 **Business Profiles** - View complete business details with ratings and reviews
- ➕ **Add Businesses** - Register new businesses to the directory
- ⭐ **Ratings & Reviews** - Ratings and review counts for businesses
- ✅ **Verification Badge** - Verified business indicators
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Built with TailwindCSS for a professional look

## 📋 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin requests support

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB running locally (port 27017) or connection string ready

### 1. Clone Repository
```bash
cd UK-Business-Directory
```

### 2. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 3. Environment Setup

**Server** - Create/update `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/uk-business-directory
PORT=5000
NODE_ENV=development
```

**Client** - Create/update `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database (Optional)

Populate database with sample businesses:
```bash
cd server
npm run seed
```

### 5. Start Development Servers

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```
Client runs on: `http://localhost:5173`

Visit `http://localhost:5173` in your browser to access the application.

## 📚 Project Structure

```
UK-Business-Directory/
├── server/
│   ├── models/
│   │   └── Business.js          # MongoDB schema
│   ├── routes/
│   │   └── businessRoutes.js    # API endpoints
│   ├── index.js                 # Express app entry
│   ├── seed.js                  # Database seeding
│   ├── package.json
│   ├── .env                     # Environment variables
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── BusinessCard.jsx
│   │   │   └── BusinessList.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Search & listing
│   │   │   ├── BusinessDetail.jsx # Business profile
│   │   │   └── AddBusiness.jsx  # Add new business
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── .github/
│   └── copilot-instructions.md
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Base URL
`http://localhost:5000/api`

### Business Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/businesses` | Get all businesses with pagination & filters |
| GET | `/businesses/:id` | Get single business by ID |
| POST | `/businesses` | Create new business |
| PUT | `/businesses/:id` | Update business |
| DELETE | `/businesses/:id` | Delete business |
| GET | `/businesses/meta/categories` | Get all categories |

### Query Parameters (GET /businesses)
- `search` - Search term (name/description/city)
- `category` - Filter by category
- `city` - Filter by city
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

### Example Requests

**Search businesses:**
```bash
GET http://localhost:5000/api/businesses?search=tech&category=Technology&city=London&page=1
```

**Create business:**
```bash
POST http://localhost:5000/api/businesses
Content-Type: application/json

{
  "name": "My Business",
  "email": "contact@mybusiness.com",
  "phone": "1234567890",
  "category": "Retail",
  "address": "123 Main St",
  "city": "London",
  "postcode": "SW1A 1AA",
  "description": "Business description",
  "website": "https://mybusiness.com"
}
```

## 📊 Database Schema

### Business Model

```javascript
{
  name: String (required),
  email: String (required, validated),
  phone: String (required),
  category: String (enum: Retail, Technology, Food & Beverage, Healthcare, Professional Services, Other),
  address: String (required),
  city: String (required),
  postcode: String (required),
  description: String (max 500 chars),
  website: String (URL format),
  rating: Number (0-5, default: 0),
  reviews: Number (default: 0),
  isVerified: Boolean (default: false),
  image: String (default: placeholder),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Client Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Search and browse businesses |
| `/business/:id` | BusinessDetail | View full business profile |
| `/add-business` | AddBusiness | Add new business form |

## 🛠️ Development

### Available Scripts

**Server:**
```bash
npm run dev      # Start with hot reload (nodemon)
npm start        # Production start
npm run seed     # Populate database with sample data
```

**Client:**
```bash
npm run dev      # Start dev server
npm run build    # Create production build
npm run preview  # Preview production build
```

### Code Style

- **JavaScript** - ES6+ modules
- **React** - Functional components with hooks
- **Styling** - TailwindCSS utility classes
- **API** - RESTful endpoints

## 📝 Features in Detail

### Search Functionality
- Real-time search across business names and descriptions
- Filter by category and city
- Pagination with configurable results per page

### Business Details Page
- Complete business information
- Ratings and review counts
- Contact options (phone, email, website)
- Verification status
- Timestamps (added/updated)

### Add Business Form
- Form validation
- Required and optional fields
- Category selection
- Success/error feedback
- Redirect after successful submission

## 🔐 Security Notes

- CORS enabled for frontend communication
- MongoDB query validation via Mongoose schemas
- Email and phone number validation
- URL validation for website links

## 🚀 Deployment

### Server Deployment (Heroku/Railway/Render)
1. Set environment variables in hosting platform
2. Ensure MongoDB Atlas connection string is configured
3. Deploy from git or CLI

### Client Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Configure environment variables for API URL

## 📖 Usage Examples

### Search for businesses
1. Go to home page
2. Enter search term, select category, or filter by city
3. Click through results pages

### View business details
1. Click "View Details" on any business card
2. See full information and contact options
3. Click "Call Now", "Email", or "Website" to contact

### Add a business
1. Click "Add Business" in navigation
2. Fill in required fields
3. Submit form
4. Redirected to home page showing new listing

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on localhost:27017
- Check `MONGODB_URI` in `.env`

### Port Already in Use
- Change `PORT` in server `.env`
- Change port in `vite.config.js` for client

### CORS Errors
- CORS is enabled in `server/index.js`
- Verify `VITE_API_URL` matches server URL

### Dependencies Missing
- Run `npm install` in both `server` and `client` directories
- Clear `node_modules` and reinstall if issues persist

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [TailwindCSS Guide](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Commit with descriptive messages
5. Push and create a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 Support

For issues, questions, or suggestions, please create an issue in the repository or contact the development team.

---

**Happy coding! 🚀**
