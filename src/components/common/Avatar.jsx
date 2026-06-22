const SIZES = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
}

const COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
]

function getColor(name = '') {
  const idx = name.charCodeAt(0) % COLORS.length
  return COLORS[idx] || COLORS[0]
}

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?'
}

export default function Avatar({ name = '', size = 'md', src }) {
  const sizeClass = SIZES[size] || SIZES.md
  const color = getColor(name)
  const initials = getInitials(name)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0`}
      />
    )
  }

  return (
    <div
      className={`${sizeClass} ${color} rounded-full flex items-center justify-center font-bold flex-shrink-0 select-none`}
    >
      {initials}
    </div>
  )
}
