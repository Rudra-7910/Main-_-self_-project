import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const dark = theme === "dark"

  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${dark ? "text-gray-300" : "text-slate-700"}`}>
        Dark Mode
      </span>
      <button
        onClick={toggleTheme}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${dark ? "bg-blue-500" : "bg-gray-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${dark ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
    </div>
  )
}

export default ThemeToggle
