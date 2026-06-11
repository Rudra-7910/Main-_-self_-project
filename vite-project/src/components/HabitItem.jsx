import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Button from "./Button"

function HabitItem({ habit, today, onToggle, onDelete }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"
  const isCompleted = habit.completedDates?.includes(today)

  return (
    <div className={`p-4 rounded-xl border flex items-center justify-between ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"}`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(habit._id)}
          className="w-5 h-5"
        />
        <span className={
          isCompleted
            ? `line-through ${dark ? "text-gray-500" : "text-slate-400"}`
            : dark ? "text-white" : "text-slate-700"
        }>
          {habit.name}
        </span>
      </div>
      <Button variant="ghost" onClick={() => onDelete(habit._id)}>
        Delete
      </Button>
    </div>
  )
}

export default HabitItem
