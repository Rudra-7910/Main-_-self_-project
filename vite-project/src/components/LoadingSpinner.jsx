function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-3" />
      <p className="text-slate-500">{message}</p>
    </div>
  )
}

export default LoadingSpinner
