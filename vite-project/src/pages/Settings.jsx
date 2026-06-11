import { useContext } from "react"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import PageHeader from "../components/PageHeader"
import Card from "../components/Card"
import Button from "../components/Button"
import ThemeToggle from "../components/ThemeToggle"

function Settings() {
  const { isAuthenticated, setisAuthenticated } = useAuth()
  const { theme } = useContext(ThemeContext)
  const dark = theme === "dark"
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    setisAuthenticated({ user: null, accessToken: null })
    navigate("/")
  }

  return (
    <div>
      <PageHeader title="Settings" />

      <Card className={`max-w-md space-y-4 border ${dark ? "border-gray-700" : "border-slate-200"}`}>
        <div>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-slate-500"}`}>Logged in as</p>
          <p className={`text-lg font-medium ${dark ? "text-white" : "text-slate-700"}`}>
            {isAuthenticated?.user || "User"}
          </p>
        </div>

        <hr className={dark ? "border-gray-700" : "border-slate-200"} />

        <ThemeToggle />

        <hr className={dark ? "border-gray-700" : "border-slate-200"} />

        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  )
}

export default Settings
