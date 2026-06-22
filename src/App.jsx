import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

// Layouts
import PublicLayout from './components/PublicLayout'
import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

// Public Pages
import Home from './pages/shared/Home'
import Login from './pages/shared/Login'
import Register from './pages/shared/Register'
import About from './pages/shared/About'
import Services from './pages/shared/Services'
import NotFound from './pages/shared/NotFound'

// Protected Pages
import Dashboard from './pages/shared/Dashboard'
import Profile from './pages/shared/Profile'

// User pages
import MyRequests from './pages/user/MyRequests'

// Worker pages
import AllRequests from './pages/worker/AllRequests'

import ScrollToTop from './components/ScrollTop'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
         <ScrollToTop/>
        <Routes>
      
          {/* ── Public routes (with PublicNavbar) ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ── Protected routes (with MainLayout + auth Navbar) ── */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* User only */}
            <Route
              path="/my-requests"
              element={
                <ProtectedRoute requiredRole="user">
                  <MyRequests />
                </ProtectedRoute>
              }
            />

            {/* Worker only */}
            <Route
              path="/all-requests"
              element={
                <ProtectedRoute requiredRole="worker">
                  <AllRequests />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
