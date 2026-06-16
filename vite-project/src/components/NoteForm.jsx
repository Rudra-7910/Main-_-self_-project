import { useState } from "react"
import Button from "./Button"
function NoteForm({ onSubmit }) {
  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit({ title: noteTitle, content: noteContent })
      setNoteTitle("")
      setNoteContent("")
    } catch (error) {
      console.error("Failed to create note:", error)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Note title"
          required/>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full  rounded-lg px-3 py-2 h-28 resize-none"
          placeholder="Write your note..."
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Save Note
      </Button>
    </form>
  )
}
export default NoteForm
