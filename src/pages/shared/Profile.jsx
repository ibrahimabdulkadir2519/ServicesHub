import { useState, useEffect } from 'react'
import { useProfile } from '../../hooks/useProfile'
import { useApp } from '../../context/AppContext'
import Avatar from '../../components/common/Avatar'
import { User, Phone, FileText, Mail, Shield, Save, Wrench } from 'lucide-react'

const CATEGORIES = ['Dayactir', 'Berkedo', 'Koronto', 'Midab', 'Beer', 'Nadiifin', 'Kale']

export default function Profile() {
  const { profile, updateProfile, saving } = useProfile()
  const { state } = useApp()
  const [form, setForm] = useState({ full_name: '', phone: '', bio: '', category: '' })
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        category: profile.category || '',
      })
    }
  }, [profile])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setEdited(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await updateProfile(form)
    if (ok) setEdited(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <Avatar name={profile?.full_name || ''} size="xl" />
          <div>
            <h1 className="text-xl font-bold">{profile?.full_name || 'User'}</h1>
            <p className="text-blue-200 text-sm">{profile?.email}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="inline-block bg-white/20 border border-white/30 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {state.role === 'worker' ? '🔧 Xirfadle' : '🙋 Macmiil'}
              </span>
              {/* Worker-ka category-giisa ku tus */}
              {state.role === 'worker' && profile?.category && (
                <span className="inline-block bg-yellow-400/20 border border-yellow-300/40 text-yellow-100 text-xs font-semibold px-3 py-1 rounded-full">
                  ⚡ {profile.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <User size={18} className="text-blue-500" />
          Macluumaadkaaga Wax Ka Beddel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Magaca Buuxa</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefoonka</label>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+252 61 xxx xxxx"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* ── Worker: */}
          {state.role === 'worker' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 
                mb-2 flex items-center gap-1.5">
                <Wrench size={14} className="text-blue-500" />
                Xirfaddaada Nooca
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setForm({ ...form, category: cat }); setEdited(true) }}
                    className={`py-2 px-3 rounded-xl border-2 text-sm font-medium text-left transition-all
                      ${form.category === cat
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ku saabsanaanshaha</label>
            <div className="relative">
              <FileText size={15} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                placeholder={
                  state.role === 'worker'
                    ? 'Xirfadahaaga iyo khibradaada sharax...'
                    : 'Wax yar ku saabsanaanshaha naftaada...'
                }
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !edited}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            <Save size={16} />
            {saving ? 'La keydinayaa...' : 'Keydi'}
          </button>
        </form>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield size={18} className="text-blue-500" />
          Macluumaadka Akoonka
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Nooca Akoonka</span>
            <span className="font-medium capitalize text-gray-800">{state.role}</span>
          </div>
          {state.role === 'worker' && (
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Xirfadda</span>
              <span className="font-medium text-blue-700">{profile?.category || '—'}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Akoonka La Abuuray</span>
            <span className="font-medium text-gray-800">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('so-SO') : '—'}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Xaalada</span>
            <span className="text-emerald-600 font-semibold">✅ Firfircoon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
