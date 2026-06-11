import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function PageHeader({ title, subtitle }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"

  return (
    <div className="mb-8">
      <h1 className={`font-bold text-3xl ${dark ? "text-white" : ""}`}>{title}</h1>
      {subtitle && (
        <p className={`mt-1 ${dark ? "text-gray-400" : "text-slate-500"}`}>{subtitle}</p>
      )}
    </div>
  )
}

export default PageHeader
