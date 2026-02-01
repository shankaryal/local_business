# Advanced Features & Best Practices

## 🚀 Built-in Features

### API Service Layer
All API calls are centralized in `client/src/services/businessAPI.js`
- Provides consistent error handling
- Axios interceptors for request/response processing
- Environment variable configuration support
- Easy to extend with new endpoints

### Error Boundary
The app includes React Error Boundary for graceful error handling
- Catches JavaScript errors in components
- Shows user-friendly error page
- Prevents app crash from propagating

## 🔧 Customization Guide

### Change API URL
Edit `client/.env`:
```env
VITE_API_URL=http://your-api-url/api
```

### Modify Styling
All styles use TailwindCSS. To customize:
1. Edit `client/tailwind.config.js` for theme
2. Use TailwindCSS classes directly in JSX

### Add New Business Categories
1. Update enum in `server/models/Business.js`
2. Update seed data in `server/seed.js`

### Change Pagination Size
In `client/src/pages/Home.jsx`, modify the limit parameter:
```javascript
await businessAPI.searchBusinesses(search, category, city, page, 20) // 20 per page
```

## 🔐 Security Best Practices

### Input Validation
- Server-side Mongoose schema validation
- Client-side form validation before submission
- Email, phone, and URL format checks

### CORS Configuration
CORS is enabled in `server/index.js`. For production:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
```

### Environment Variables
Never commit `.env` files - always use `.env.example` as template

## 📈 Performance Tips

### Database Optimization
1. **Indexing**: Add indexes for frequently queried fields:
```javascript
businessSchema.index({ name: 'text', description: 'text' }) // Text search
businessSchema.index({ city: 1, category: 1 }) // Compound index
```

2. **Pagination**: Already implemented to prevent loading all records

3. **Lean Queries**: For read-only operations:
```javascript
const businesses = await Business.find(query).lean()
```

### Client Optimization
- Components use React hooks efficiently
- Error boundaries prevent cascading failures
- Service layer enables caching strategies

## 🧪 Testing Ideas

### Unit Tests (Jest + React Testing Library)
```bash
npm install --save-dev jest @testing-library/react
```

### Integration Tests
Test API + Database interactions

### E2E Tests (Cypress)
```bash
npm install --save-dev cypress
```

## 🚀 Production Deployment

### Environment Setup
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Build Process
```bash
# Client
cd client
npm run build

# Server runs as-is, no build needed
```

### Deployment Options

**Vercel (Frontend)**
- Push to GitHub
- Connect in Vercel dashboard
- Auto-deploys on push

**Railway/Render/Heroku (Backend)**
- Connect MongoDB Atlas
- Set environment variables
- Deploy with `git push`

**Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring & Logging

### Server Logging
Add Winston or Pino for production logging:
```javascript
import winston from 'winston'
const logger = winston.createLogger(...)
```

### API Monitoring
Consider Sentry for error tracking:
```javascript
import * as Sentry from "@sentry/node"
Sentry.init({ dsn: process.env.SENTRY_DSN })
```

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

## 🎯 Future Enhancement Ideas

1. **User Authentication** - JWT-based auth with registration
2. **Reviews & Ratings** - User-submitted reviews and ratings
3. **Image Upload** - Multer for business photos
4. **Email Notifications** - Nodemailer for alerts
5. **Admin Dashboard** - Business management interface
6. **Advanced Search** - Elasticsearch integration
7. **Analytics** - Business view counts and metrics
8. **Favorites** - User saved businesses (with localStorage or DB)
9. **Maps Integration** - Google Maps for location display
10. **Real-time Updates** - Socket.io for live business changes

## 📚 Useful Libraries to Add

```bash
# Authentication
npm install bcryptjs jsonwebtoken

# File Upload
npm install multer cloudinary

# Email
npm install nodemailer

# Logging
npm install winston

# Validation
npm install joi

# Real-time
npm install socket.io

# Documentation
npm install swagger-ui-express swagger-jsdoc
```

## 🤔 Common Issues & Solutions

### CORS Errors
Ensure API URL in `.env` matches server URL exactly (including protocol)

### Slow Database Queries
- Add indexes for frequently filtered fields
- Use `.lean()` for read-only queries
- Implement caching with Redis

### Memory Leaks
- Always cleanup useEffect listeners
- Cancel axios requests in cleanup
- Monitor with Chrome DevTools

### Build Issues
- Clear `node_modules` and reinstall
- Update dependencies: `npm update`
- Check Node version compatibility

---

Happy developing! 🎉
