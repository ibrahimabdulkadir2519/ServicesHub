const SkeletonCard = () => (
  <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse space-y-3">
    <div className="flex justify-between">
      <div className="h-5 w-20 bg-gray-100 rounded-lg"></div>
      <div className="h-5 w-24 bg-gray-100 rounded-lg"></div>
    </div>
    <div className="h-6 w-3/4 bg-gray-100 rounded-lg"></div>
    <div className="h-4 w-full bg-gray-100 rounded-lg"></div>
    <div className="flex gap-3 pt-3 border-t border-gray-50">
      <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
      <div className="h-4 w-32 bg-gray-100 rounded"></div>
    </div>
  </div>
);