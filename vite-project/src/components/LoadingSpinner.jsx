import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function LoadingSpinner({ message = "Loading..." }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`w-8 h-8 border-4 rounded-full animate-spin mb-3 ${dark ? "border-gray-600 border-t-blue-400" : "border-gray-200 border-t-blue-500"}`} />
      <p className={dark ? "text-gray-400" : "text-slate-500"}>{message}</p>
    </div>
  )
}

export default LoadingSpinner
