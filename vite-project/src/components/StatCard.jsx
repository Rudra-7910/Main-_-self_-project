import Card from "./Card"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function StatCard({ label, value, borderColor, action }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"

  return (
    <Card borderColor={borderColor}>
      <p className={`text-sm uppercase tracking-wide ${dark ? "text-gray-400" : "text-slate-500"}`}>
        {label}
      </p>
      {action && (
        <div className="mt-2">{action}</div>
      )}
      <p className={`text-4xl font-bold mt-2 ${dark ? "text-white" : "text-slate-800"}`}>
        {value}
      </p>
    </Card>
  )
}

export default StatCard
