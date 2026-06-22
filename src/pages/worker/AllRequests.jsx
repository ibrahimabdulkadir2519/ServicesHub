import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useRequests } from '../../hooks/useRequests'
import StatusBadge from '../../components/common/StatusBadge'
import Avatar from '../../components/common/Avatar'
import Spinner from '../../components/common/Spinner'
import { ClipboardList, CheckCircle, XCircle, RotateCcw, X, ChevronRight, MapPin, Briefcase } from 'lucide-react'

const SkeletonCard = () => (
  <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse space-y-3">
    <div className="flex justify-between">
      <div className="h-5 w-20 bg-gray-700 rounded-lg"></div>
      <div className="h-5 w-24 bg-gray-100 rounded-lg"></div>
    </div>
    <div className="h-6 w-3/4 bg-gray-100 rounded-lg"></div>
    <div className="h-4 w-full bg-gray-100 rounded-lg"></div>
  </div>
);
function ActionModal({ request, onClose, onUpdate, onCancel, currentUserId }) {
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (status) => {
    setLoading(true)
    await onUpdate(request.id, status, note)
    setLoading(false)
    onClose()
  }

  const handleCancel = async () => {
    setLoading(true)
    await onCancel(request.id)
    setLoading(false)
    onClose()
  }

  

  const isLocked = request.status === 'complete' || request.status === 'reject';
  const isMyAcceptedJob = request.status === 'accepted' && request.worker_id === currentUserId;

  return (
    
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Codsiga Maamul</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-sm">{request.title}</h3>
                <StatusBadge status={request.status} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-gray-600 bg-white border border-gray-100 px-2 py-0.5 rounded-md shrink-0">
                <MapPin size={12} className="text-red-500" /> {request.location || 'Muqdisho'}
              </span>
            </div>
            <p className="text-gray-600 text-xs mb-2">{request.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="bg-white border border-gray-200 px-2 py-0.5 rounded-md">{request.category}</span>
              {request.budget && <span>💰 ${request.budget}</span>}
            </div>
            {request.profiles && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                <Avatar name={request.profiles.full_name} size="sm" />
                <div>
                  <p className="text-xs font-medium text-gray-800">{request.profiles.full_name}</p>
                  <p className="text-xs text-gray-400">Codsi diray</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Faallo (ikhtiyaari)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Macmiilka faallo u qor..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => handle('complete')}
              disabled={loading || isLocked || request.status === 'complete'}
              className="flex flex-col items-center gap-1.5 py-3 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-40 border border-emerald-200 text-emerald-700 rounded-xl transition-colors text-xs font-semibold"
            >
              <CheckCircle size={18} /> Dhammaystir
            </button>
            <button
              onClick={() => handle('reject')}
              disabled={loading || isLocked || request.status === 'reject'}
              className="flex flex-col items-center gap-1.5 py-3 bg-red-50 hover:bg-red-100 disabled:opacity-40 border border-red-200 text-red-700 rounded-xl transition-colors text-xs font-semibold"
            >
              <XCircle size={18} /> Diid
            </button>
            <button
              onClick={() => handle('pending')}
              disabled={loading || isLocked || request.status === 'pending'}
              className="flex flex-col items-center gap-1.5 py-3 bg-amber-50 hover:bg-amber-100 disabled:opacity-40 border border-amber-200 text-amber-700 rounded-xl transition-colors text-xs font-semibold"
            >
              <RotateCcw size={18} /> Dib Pending
            </button>
          </div>

          {/* ── CUSUB: Ka noqo shaqada — kaliya haddii isaga qudhiisa aqbalay ── */}
          {isMyAcceptedJob && (
            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 border border-orange-200 text-orange-700 rounded-xl transition-colors text-sm font-semibold"
            >
              <RotateCcw size={16} />
              Ka noqo Shaqadan (dib u celi Sugitaanka)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AllRequests() {
  const { state } = useApp()
  const { requests, fetchRequests, updateStatus, acceptRequest, cancelJob } = useRequests()
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (state.user) {
      fetchRequests()
    }
  }, [state.user])

  if (state.loading) return <Spinner text="Dhammaan codsiyada la soo rrayaa..." />

  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter)

  const handleAcceptJob = async (e, requestId) => {
    e.stopPropagation()
    setActionLoading(true)
    await acceptRequest(requestId)
    setActionLoading(false)
  }
  
  return (
    
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dhammaan Codsiyada</h1>
        <p className="text-gray-500 text-sm mt-0.5">{requests?.length || 0} codsi jira</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { value: 'all', label: 'Dhammaan', count: requests?.length || 0 },
          { value: 'pending', label: 'Sugitaanka', count: requests?.filter(r => r.status === 'pending').length || 0 },
          { value: 'accepted', label: 'La Aqbalay', count: requests?.filter(r => r.status === 'accepted').length || 0 },
          { value: 'complete', label: 'Dhammaystay', count: requests?.filter(r => r.status === 'complete').length || 0 },
          { value: 'reject', label: 'Diidmo', count: requests?.filter(r => r.status === 'reject').length || 0 },
        ].map(({ value, label, count }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${filter === value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === value ? 'bg-white/20' : 'bg-gray-100'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
          <ClipboardList size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">Codsi ma jiro</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div
              key={req.id}
              onClick={() => {
                if (state.role === 'worker' && req.status === 'pending') return;
                setSelected(req)
              }}
              className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group relative block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {req.category}
                  </span>
                  <StatusBadge status={req.status} />
                </div>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
                  {req.budget ? `$${req.budget}` : 'Heshiis'}
                </span>
              </div>

              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                    {req.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-1 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                {state.role === 'worker' && req.status === 'pending' && (
                  <button
                    disabled={actionLoading}
                    onClick={(e) => handleAcceptJob(e, req.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors shrink-0 z-10"
                  >
                    <Briefcase size={14} />
                    Aqbal Shaqada
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  {req.profiles && (
                    <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg">
                      <Avatar name={req.profiles.full_name} size="sm" />
                      <span className="font-medium text-gray-700">{req.profiles.full_name}</span>
                    </div>
                  )}
                  <span className="text-gray-600 font-medium flex items-center gap-0.5">
                    <MapPin size={13} className="text-red-500 shrink-0" /> {req.location || 'Muqdisho'}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>{new Date(req.created_at).toLocaleDateString('so-SO')}</span>
                </div>
                
                {!(state.role === 'worker' && req.status === 'pending') && (
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <ActionModal
          request={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateStatus}
          onCancel={cancelJob}
          currentUserId={state.user.id}
        />
      )}
    </div>
  )
}