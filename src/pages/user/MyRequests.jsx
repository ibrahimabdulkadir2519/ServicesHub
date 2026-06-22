import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useRequests } from '../../hooks/useRequests'
import StatusBadge from '../../components/common/StatusBadge'
import Spinner from '../../components/common/Spinner'
import { Plus, Trash2, X, ClipboardList, Pencil } from 'lucide-react'

const CATEGORIES = ['Dayactir', 'Berkedo', 'Koronto', 'Midab', 'Beer', 'Nadiifin', 'Kale']
const MIN_BUDGET = 5

function NewRequestModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '', description: '', category: 'Dayactir', budget: '', location: ''
  })
  const [loading, setLoading] = useState(false)
  const [budgetError, setBudgetError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.budget !== '' && parseFloat(form.budget) < MIN_BUDGET) {
      setBudgetError(`Miisaaniyadu waa inay ahaataa ugu yaraan $${MIN_BUDGET}`)
      return
    }
    setBudgetError('')
    setLoading(true)
    const submitData = {
      ...form,
      budget: form.budget ? parseFloat(form.budget) : null
    }
    const ok = await onCreate(submitData)
    setLoading(false)
    if (ok) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Codsi Cusub</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cinwaanka</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Masalan: Biyo maroodi ah la hagaajiyo"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Faahfaahin</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Adeegga aad u baahan tahay si faahfaahsan u sharax..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Goobta / Xaafadda</label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Tusaale: Hodan, Km4 ama Waaberi"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nooca Adeegga</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Miisaaniyada ($) <span className="text-gray-400 font-normal">(ikhtiyaari)</span>
              </label>
              <input
                type="number"
                min={MIN_BUDGET}
                value={form.budget}
                onChange={(e) => { setForm({ ...form, budget: e.target.value }); setBudgetError('') }}
                placeholder={`Ugu yaraan $${MIN_BUDGET}`}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${budgetError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {budgetError && <p className="text-red-500 text-xs mt-1">{budgetError}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Ka noqo
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl"
            >
              {loading ? 'La direyaa...' : 'Dir Codsiga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

//  Edit Modal 
function EditRequestModal({ request, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title:       request.title       || '',
    description: request.description || '',
    category:    request.category    || 'Dayactir',
    budget:      request.budget      ?? '',
    location:    request.location    || '',
  })
  const [loading, setLoading] = useState(false)
  const [budgetError, setBudgetError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.budget !== '' && parseFloat(form.budget) < MIN_BUDGET) {
      setBudgetError(`Miisaaniyadu waa inay ahaataa ugu yaraan $${MIN_BUDGET}`)
      return
    }
    setBudgetError('')
    setLoading(true)
    const ok = await onUpdate(request.id, {
      ...form,
      budget: form.budget !== '' ? parseFloat(form.budget) : null,
    })
    setLoading(false)
    if (ok) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Codsi Wax ka Badel</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cinwaanka</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Masalan: Biyo maroodi ah la hagaajiyo"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Faahfaahin</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Adeegga aad u baahan tahay si faahfaahsan u sharax..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Goobta / Xaafadda</label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Tusaale: Hodan, Km4 ama Waaberi"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nooca Adeegga</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Miisaaniyada ($) <span className="text-gray-400 font-normal">(ikhtiyaari)</span>
              </label>
              <input
                type="number"
                min={MIN_BUDGET}
                value={form.budget}
                onChange={(e) => { setForm({ ...form, budget: e.target.value }); setBudgetError('') }}
                placeholder={`Ugu yaraan $${MIN_BUDGET}`}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${budgetError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {budgetError && <p className="text-red-500 text-xs mt-1">{budgetError}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Ka noqo
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl"
            >
              {loading ? 'La keydinayaa...' : 'Keydi Isbeddelka'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function MyRequests() {
  const { state } = useApp()
  const { requests, fetchRequests, createRequest, deleteRequest, updateRequest } = useRequests()
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)
  const [editRequest, setEditRequest] = useState(null)   // ← cusub

  useEffect(() => {
    if (state.user) {
      fetchRequests()
    }
  }, [state.user])

  if (state.loading) return <Spinner text="Codsiyadaada la soo rrayaa..." />

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter)

  const confirmDelete = async (id) => {
    await deleteRequest(id)
    setDeleteId(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Codsigayga</h1>
          <p className="text-gray-500 text-sm mt-0.5">{requests?.length || 0} codsi guud</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus size={17} /> Codsi Cusub
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { value: 'all', label: 'Dhammaan' },
          { value: 'pending', label: 'Sugitaanka' },
          { value: 'complete', label: 'Dhammaystay' },
          { value: 'reject', label: 'Diidmo' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${filter === value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
          <ClipboardList size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">Codsi ma jiro</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 text-blue-600 text-sm font-medium hover:underline"
          >
            + Abuur codsikaaga koowaad
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{req.title}</h3>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-2">{req.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-md">{req.category}</span>
                    <span>📍 {req.location || 'Muqdisho'}</span>
                    {req.budget && <span>💰 ${req.budget}</span>}
                    <span>{new Date(req.created_at).toLocaleDateString('so-SO')}</span>
                  </div>
                  {req.worker_note && (
                    <div className={`mt-3 text-xs px-3 py-2 rounded-lg
                      ${req.status === 'complete' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      <span className="font-semibold">Xirfadlaha:</span> {req.worker_note}
                    </div>
                  )}
                </div>

                {/* ── Buttons: Edit + Delete (pending kaliya) ── */}
                {req.status === 'pending' && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setEditRequest(req)}
                      className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Wax ka badel"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteId(req.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Tirtir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Codsiga Tirtir?</h3>
            <p className="text-gray-500 text-sm mb-5">Ficilkan waa la beddeli karo.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium"
              >
                Ka noqo
              </button>
              <button
                onClick={() => confirmDelete(deleteId)}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                Haa, Tirtir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New request modal */}
      {showModal && (
        <NewRequestModal onClose={() => setShowModal(false)} onCreate={createRequest} />
      )}

      {/* Edit modal */}
      {editRequest && (
        <EditRequestModal
          request={editRequest}
          onClose={() => setEditRequest(null)}
          onUpdate={updateRequest}
        />
      )}
    </div>
  )
}