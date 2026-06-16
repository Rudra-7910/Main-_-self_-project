import { forwardRef } from "react"

const Input = forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`w-full border rounded-lg px-3 py-3 ${className}`}
      {...props}
    />
  )
})

export default Input
