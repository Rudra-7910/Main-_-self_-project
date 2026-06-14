import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
function ConfirmDialog({
  isOpen, 
  onConfirm,
  onCancel,
  message = "Are you sure?",
  confirmText = "Yes, Delete", 
  cancelText = "Cancel",
}) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <div className="text-center mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <p className={`text-center mb-6 ${dark ? "text-gray-300" : "text-slate-600"}`}>
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${dark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
