const variantClasses = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost: "text-red-400 hover:text-red-600 text-sm",
}

function Button({ variant = "primary", children, className = "", ...props }) {
  const base = "px-4 py-2 rounded-lg transition-colors"
  const styles = variantClasses[variant] || variantClasses.primary

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
