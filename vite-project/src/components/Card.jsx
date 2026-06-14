function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-md p-6 flex-col flex-1 ${className}`}>
      {children}
    </div>
  )
}
export default Card
