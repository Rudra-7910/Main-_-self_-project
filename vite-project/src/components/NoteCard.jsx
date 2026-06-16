import { useContext, useState, memo } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Button from "./Button"
import ConfirmDialog from "./ConfirmDialog"
const NoteCard = memo(function NoteCard({ note, onDelete, showDelete = true }) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"
  const [showConfirm, setShowConfirm] = useState(false)
  return (
    <>
      <div className={`p-4 rounded-xl border flex justify-between items-start transition-colors duration-200 ${dark
        ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
        }`}>
        <div>
          <h3 className={`font-medium ${dark ? "text-white" : "text-slate-700"}`}>
            {note.title}
          </h3>
          <p className={`text-sm mt-1 line-clamp-2 ${dark ? "text-gray-400" : "text-slate-500"}`}>
            {note.content}
          </p>
        </div>
        {showDelete && onDelete && (
          <Button className="text-red-400 hover:text-red-600 text-sm" onClick={() => setShowConfirm(true)}>
            Delete
          </Button>
        )}
      </div>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => {
          onDelete(note._id)        // parent ka delete function call karo
          setShowConfirm(false)     // dialog band karo
        }}
        onCancel={() => setShowConfirm(false)}
        message={`Delete "${note.title}"? This can't be undone.`}
      />
    </>
  )
})

export default NoteCard
