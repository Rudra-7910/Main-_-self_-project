import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function Card({ children, className = "", borderColor = "" }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"

  const borderClass = borderColor ? `border-l-4 ${borderColor}` : ""

  return (
    <div className={`rounded-2xl shadow-md p-6 ${dark ? "bg-gray-800" : "bg-white"} ${borderClass} ${className}`}>
      {children}
    </div>
  )
}

export default Card
