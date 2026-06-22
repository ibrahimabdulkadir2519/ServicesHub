import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
];

export default function PublicNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isNotHome = location.pathname !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isNotHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <Wrench size={18} className="text-white" />
            </div>
            <span className={`font-extrabold tracking-tight transition-colors ${scrolled || isNotHome ? 'text-gray-900' : 'text-white'}`}>
              ServiceHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(to)
                    ? (scrolled || isNotHome) ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/15'
                    : (scrolled || isNotHome) ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className={`px-5 py-2 text-sm font-semibold rounded-xl border transition-all ${scrolled || isNotHome ? 'text-gray-700 border-gray-200 hover:bg-gray-50' : 'text-white border-white/20 hover:bg-white/10'}`}>
              Soo gal
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md">
              Diiwaangeli
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className={`md:hidden p-2 rounded-xl ${scrolled || isNotHome ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full pb-4">
          <div className="flex flex-col p-4 space-y-2">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                {label}
              </Link>
            ))}
            <hr className="my-2" />
            <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg">Soo gal</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3 bg-blue-600 text-white rounded-lg text-center font-bold">Diiwaangeli</Link>
          </div>
        </div>
      )}
    </nav>
  );
}