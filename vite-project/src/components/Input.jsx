import { forwardRef, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

const Input = forwardRef(function Input({ className = "", ...props }, ref) {
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"

  const baseClasses = `w-full border rounded-lg px-3 py-3 ${dark ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" : "border-gray-300"}`

  return (
    <input
      ref={ref}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  )
})

export default Input
