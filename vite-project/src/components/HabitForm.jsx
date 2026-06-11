import { useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Button from "./Button"
import Input from "./Input"

function HabitForm({ onAdd }) {
  const [newHabit, setNewHabit] = useState("")
  const { theme } = useContext(ThemeContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newHabit.trim()) return
    try {
      await onAdd(newHabit)
      setNewHabit("")
    } catch (error) {
      console.error("Failed to create habit:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Add a new habit..."
        className="flex-1"
      />
      <Button variant="success" type="submit">
        Add
      </Button>
    </form>
  )
}

export default HabitForm
