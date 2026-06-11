import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
function DashboardLayout() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900 text-white" : ""}`}>
      <Sidebar />
      <main className={`flex-1 overflow-y-auto p-6 ${theme === "dark" ? "bg-gray-900" : "bg-slate-100"}`}>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
