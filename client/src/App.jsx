import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import AddBusiness from './pages/AddBusiness'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/business/:id" element={<BusinessDetail />} />
              <Route path="/add-business" element={<AddBusiness />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center py-4 mt-8">
            <p>&copy; 2024 UK Business Directory. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
