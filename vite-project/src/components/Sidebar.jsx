import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
function Sidebar() {
  const navigate = useNavigate();
  const { setisAuthenticated } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setisAuthenticated({ user: null, accessToken: null });
    navigate("/");
  };
  return (
    <div className="w-64 h-screen bg-slate-800 text-white flex flex-col">
  <h1 className="text-center text-3xl font-bold py-6 border-b border-slate-700">
    Focus Point
  </h1>
  <nav className="flex flex-col flex-1 p-4 gap-3">
    <NavLink to="/dashboard" className="px-4 py-2 rounded hover:bg-slate-700">
      Dashboard
    </NavLink>

    <NavLink to="/notes" className="px-4 py-2 rounded hover:bg-slate-700">
      Notes
    </NavLink>

    <NavLink to="/settings" className="px-4 py-2 rounded hover:bg-slate-700">
      Settings
    </NavLink>

    <NavLink to="/habits" className="px-4 py-2 rounded hover:bg-slate-700">
      Habits
    </NavLink>

    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded hover:bg-red-500 mt-auto transition-all duration-800 ease-in-out text-left"
    >
      Logout
    </button>
  </nav>
</div>
)}
export default Sidebar