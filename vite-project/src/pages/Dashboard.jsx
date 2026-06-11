import { useEffect, useState } from "react"
import { getNotes, createNote } from "../services/noteService"
import { getHabits } from "../services/habitService"
import useAuth from "../hooks/useAuth"
import PageHeader from "../components/PageHeader"
import StatCard from "../components/StatCard"
import NoteCard from "../components/NoteCard"
import NoteForm from "../components/NoteForm"
import Card from "../components/Card"
import Button from "../components/Button"
import LoadingSpinner from "../components/LoadingSpinner"
import CustomModal from "../components/AddModalCard"

function Dashboard() {
  const { isAuthenticated } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stats, setStats] = useState({ totalNotes: 0, totalHabits: 0, totalTasks: 0 })
  const [loading, setLoading] = useState(true)
  const [recentNotes, setRecentNotes] = useState([])

  const fetchData = async () => {
    try {
      const notes = await getNotes()
      setStats((prev) => ({ ...prev, totalNotes: Array.isArray(notes) ? notes.length : 0 }))
      if (Array.isArray(notes)) {
        setRecentNotes(notes.slice(-3).reverse())
      }
      const habits = await getHabits()
      setStats((prev) => ({ ...prev, totalHabits: Array.isArray(habits) ? habits.length : 0 }))
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleNoteSubmit = async (noteData) => {
    await createNote(noteData)
    setIsModalOpen(false)
    await fetchData()
  }

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />
  }

  return (
    <div>
      <PageHeader
        title={`Welcome back${isAuthenticated?.user ? `, ${isAuthenticated.user}` : ""} 👋`}
        subtitle="Here's your Focus Point overview"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Notes"
          value={stats.totalNotes}
          borderColor="border-blue-500"
          action={
            <Button onClick={() => setIsModalOpen(true)} className="text-sm px-3 py-1.5">
              + Add a new note
            </Button>
          }
        />
        <StatCard label="Habits Tracked" value={stats.totalHabits} borderColor="border-green-500" />
        <StatCard label="Tasks" value={stats.totalTasks} borderColor="border-purple-500" />
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>
        {recentNotes.length === 0 ? (
          <p className="text-slate-400">No notes yet. Start writing!</p>
        ) : (
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <NoteCard key={note._id} note={note} showDelete={false} />
            ))}
          </div>
        )}
      </Card>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add a New Note"
      >
        <NoteForm onSubmit={handleNoteSubmit} />
      </CustomModal>
    </div>
  )
}

export default Dashboard
