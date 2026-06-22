const STATUS_CONFIG = {
  pending: {
    label: 'Sugitaanka',
    class: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-400',
  },
  accepted: {
    label: 'La Aqbalay',
    class: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
  complete: {
    label: 'Dhammaystay',
    class: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  reject: {
    label: 'La Diidey',
    class: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    class: 'bg-gray-50 text-gray-600 border-gray-200',
    dot: 'bg-gray-400',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.class}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}
