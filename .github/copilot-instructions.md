# Copilot Instructions for UK Business Directory

## Architecture Overview
This is a **full-stack MERN application** with client-server separation:
- **Server**: Node.js + Express, MongoDB via Mongoose, runs on port 5000 (default)
- **Client**: React 18 + Vite + TailwindCSS + React Router, runs on port 5173 (Vite default)

The application follows a standard REST API pattern where the client makes HTTP requests (via axios) to the server and displays results using React components.

## Key Development Workflows

### Server Development
```bash
cd server
npm install
npm run dev        # Watch mode with nodemon
npm start          # Production mode
```

- Server runs on `http://localhost:5000`
- MongoDB URI configured via `.env` (default: `mongodb://localhost:27017/uk-business-directory`)
- Middleware: CORS enabled for frontend, JSON body parser configured
- Structure: `models/` (Mongoose schemas) → `routes/` (API endpoints) → `index.js` (Express app)

### Client Development
```bash
cd client
npm install
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview built app locally
```

- Client runs on `http://localhost:5173`
- Configured with TailwindCSS for styling
- Uses React Router for page navigation
- Axios for HTTP requests to backend (baseURL should point to `http://localhost:5000`)

## Critical Patterns & Conventions

### API Communication
- Client uses `axios` (already configured as dependency)
- Server uses Express request/response handlers
- CORS already enabled in `index.js` - no additional setup needed
- Example pattern: `axios.get('http://localhost:5000/api/endpoint')`

### Data Models
- MongoDB schemas go in `server/models/` (empty - awaiting implementation)
- Use Mongoose for schema definition and validation
- Example naming convention: `Business.js`, `User.js`, etc.

### Routes & Controllers
- API routes in `server/routes/` (empty - awaiting implementation)
- Recommended structure: One file per resource (e.g., `businessRoutes.js`)
- Attach routes to Express app in `index.js` using `app.use('/api/...', routes)`

### Frontend Components
- React components in `client/src/components/` (empty - awaiting implementation)
- Page components in `client/src/pages/` (empty - awaiting implementation)
- Use React Router for navigation between pages
- Leverage TailwindCSS classes for styling (no separate CSS files needed typically)

### Environment Configuration
- Server: Configure `MONGODB_URI` and `PORT` in `.env` file (copy pattern from `index.js`)
- Client: Vite config at `client/vite.config.js` if customization needed
- Use `dotenv` on server side, Vite's import.meta.env on client side

## Common Tasks

| Task | Command | Location |
|------|---------|----------|
| Start full dev stack | Run both `npm run dev` in separate terminals (server & client) | `server/` & `client/` |
| Add a new API endpoint | Create route in `server/routes/`, attach in `server/index.js` | `server/routes/` |
| Add a data model | Create Mongoose schema in `server/models/` | `server/models/` |
| Create a new page | Create React component in `client/src/pages/`, add route in React Router | `client/src/pages/` |
| Style a component | Use TailwindCSS utility classes directly in JSX | Inline in components |
| Make API calls | Use `axios.get/post/put/delete()` from components | `client/src/` |

## Important Notes

- **ES Modules**: Both client and server use `"type": "module"` - use `import/export` syntax
- **Unopened Structure**: `models/`, `routes/`, and `components/` folders exist but are empty; treat as greenfield for implementation
- **No TypeScript**: Project uses plain JavaScript - no `.ts` or `.tsx` files
- **Vite Configuration**: Likely needs `vite.config.js` if TailwindCSS integration isn't auto-detected; verify during setup
