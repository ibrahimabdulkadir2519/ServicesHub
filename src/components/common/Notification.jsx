import { useEffect, useState } from 'react'
import { useApp, ACTIONS } from '../../context/AppContext'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

const CONFIGS = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500',
    progress: 'bg-emerald-300',
    label: 'Guul',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-500',
    progress: 'bg-red-300',
    label: 'Khalad',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-amber-500',
    progress: 'bg-amber-300',
    label: 'Digniin',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-500',
    progress: 'bg-blue-300',
    label: 'Macluumaad',
  },
}

const DURATION = 4000

export default function Notification() {
  const { state, dispatch } = useApp()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)

  const notification = state.notification

  useEffect(() => {
    if (!notification) {
      setVisible(false)
      setProgress(100)
      return
    }

    setVisible(true)
    setProgress(100)

    // Shrink progress bar
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100)
      setProgress(remaining)
      if (remaining === 0) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [notification])

  const dismiss = () => {
    setVisible(false)
    setTimeout(() => dispatch({ type: ACTIONS.CLEAR_NOTIFICATION }), 300)
  }

  if (!notification) return null

  const { message, type = 'success' } = notification
  const config = CONFIGS[type] || CONFIGS.success
  const Icon = config.icon

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] w-full max-w-sm transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
    >
      <div className={`${config.bg} rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Main content */}
        <div className="flex items-start gap-3 px-4 py-3.5">
          <Icon size={20} className="text-white/90 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-0.5">
              {config.label}
            </p>
            <p className="text-sm font-medium text-white leading-snug">{message}</p>
          </div>
          <button
            onClick={dismiss}
            className="text-white/60 hover:text-white transition-colors mt-0.5 shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-black/10">
          <div
            className={`h-full ${config.progress} transition-none`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
