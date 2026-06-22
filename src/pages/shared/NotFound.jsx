import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-blue-100 mb-2">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Bogga La Heli Waayey</h1>
        <p className="text-gray-500 mb-8">Bogga aad raadinayso ma jiro ama waa la wareejiyey.</p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <Home size={17} /> Hoyga Ku Noqo
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <ArrowLeft size={17} /> Dib
          </button>
        </div>
      </div>
    </div>
  )
}
