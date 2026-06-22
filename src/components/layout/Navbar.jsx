import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Avatar from '../common/Avatar'
import { LayoutDashboard, ClipboardList, User, LogOut, Menu, X, Wrench } from 'lucide-react'

const USER_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-requests', label: 'Codsigayga', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: User },
]

const WORKER_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/all-requests', label: 'Dhammaan Codsiyada', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function Navbar() {
  const { state, logout } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  // Xaqiijinta doorka user-ka (haddii uu yahay state.role ama state.profile.role)
  const userRole = state.role || state.profile?.role || 'user'
  const links = userRole === 'worker' ? WORKER_LINKS : USER_LINKS

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (to) => location.pathname === to

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-blue-600 text-lg">
            <Wrench size={22} className="text-blue-500" />
            <span>ServiceHub</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(to) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          {/* Right Profile Section */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <Avatar name={state.profile?.full_name || ''} size="sm" />
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800 leading-none">
                  {state.profile?.full_name || 'User'}
                </p>
                <p className="text-[10px] text-gray-400 capitalize mt-0.5">{userRole}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={15} />
              Bax
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(to) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar name={state.profile?.full_name || ''} size="sm" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{state.profile?.full_name || 'User'}</p>
                <p className="text-xs text-gray-400 capitalize">{userRole}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={17} />
              Ka bax
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}