import { useEffect, useState } from "react"
import { getNotes, deleteNote } from "../services/noteService"
import PageHeader from "../components/PageHeader"
import NoteCard from "../components/NoteCard"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

function Notes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes()
        setNotes(data)
      } catch (error) {
        setError("Failed to fetch notes")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteNote(id)
      setNotes(notes.filter((note) => note._id !== id))
    } catch (error) {
      console.error("Failed to delete note:", error)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading notes..." />
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div>
      <PageHeader title="Notes" />
      {notes.length === 0 ? (
        <EmptyState message="No notes yet." />
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Notes
