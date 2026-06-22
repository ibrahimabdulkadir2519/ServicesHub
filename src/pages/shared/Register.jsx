import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Wrench, User, Mail, Lock } from 'lucide-react'

const CATEGORIES = ['Dayactir', 'Berkedo', 'Koronto', 'Midab', 'Beer', 'Nadiifin', 'Kale']

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user',
    category: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password.length < 6) {
      setError('Erayga sirta waa inuu ka badan yahay 6 xaraf')
      return
    }
    if (form.role === 'worker' && !form.category) {
      setError('Fadlan xirfaddaada nooc dooro')
      return
    }

    setLoading(true)

    
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role,
          category: form.role === 'worker' ? form.category : null,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!data?.user) {
      setError('Is-diiwaangelintu ma dhammaan. Fadlan hubi iimaylkaaga.')
      setLoading(false)
      return
    }

    

    setLoading(false)
    navigate('/login', { state: { registered: true } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-3 shadow-lg">
            <Wrench size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Accout</h1>
          <p className="text-gray-500 text-sm mt-1">ServiceHub ku biir maanta</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"></label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'user', label: 'Macmiil', icon: '', desc: 'Adeeg codsado' },
                  { value: 'worker', label: 'Shaqaale', icon: '', desc: 'Adeeg bixi' },
                ].map(({ value, label, icon, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, role: value, category: '' })}
                    className={`p-3 rounded-xl border-2 text-left transition-all
                      ${form.role === value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-xl">{icon}</span>
                    <p className={`font-semibold text-sm mt-1 ${form.role === value ? 'text-blue-700' : 'text-gray-800'}`}>
                      {label}
                    </p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.role === 'worker' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Xirfaddaada Nooca <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`py-2 px-3 rounded-xl border-2 text-sm font-medium text-left transition-all
                        ${form.category === cat
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {form.category && (
                  <p className="text-xs text-blue-600 mt-1.5 font-medium">
                    ✓ Doorashada: <span className="font-bold">{form.category}</span>
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Apraham"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Apraham@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Ugu yaraan 6 xaraf"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? 'Create...' : ' Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            I have Account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}