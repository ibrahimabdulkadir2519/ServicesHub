export default function Spinner({ text = 'La soo rareyaa...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-400 font-medium">{text}</p>
    </div>
  )
}
