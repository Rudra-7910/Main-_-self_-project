import { useEffect, useState } from "react"
import { getHabits, createHabit, toggleHabit, deleteHabit } from "../services/habitService"
import PageHeader from "../components/PageHeader"
import HabitForm from "../components/HabitForm"
import HabitItem from "../components/HabitItem"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

function Habits() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabits()
        setHabits(data)
      } catch (error) {
        console.error("Failed to fetch habits:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHabits()
  }, [])

  const handleAdd = async (name) => {
    const habit = await createHabit({ name })
    setHabits([habit, ...habits])
  }

  const handleToggle = async (id) => {
    try {
      const updated = await toggleHabit(id)
      setHabits(habits.map((h) => (h._id === id ? updated : h)))
    } catch (error) {
      console.error("Failed to toggle habit:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id)
      setHabits(habits.filter((h) => h._id !== id))
    } catch (error) {
      console.error("Failed to delete habit:", error)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading habits..." />
  }

  return (
    <div>
      <PageHeader title="Habits" />
      <HabitForm onAdd={handleAdd} />

      {habits.length === 0 ? (
        <EmptyState message="No habits yet. Start tracking!" />
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitItem
              key={habit._id}
              habit={habit}
              today={today}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Habits
