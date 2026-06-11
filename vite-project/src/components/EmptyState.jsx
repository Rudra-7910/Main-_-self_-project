import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function EmptyState({ message = "Nothing here yet." }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"

  return (
    <p className={dark ? "text-gray-400" : "text-slate-400"}>{message}</p>
  )
}

export default EmptyState
