import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/Authcontext'
import ThemeProvider from './context/ThemeContext'
import ProtectedRoute from './routes/ProtectedRouteComponent'
import DashboardLayout from './layout/DashboardLayout'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Habits from './pages/Habits'
import Notes from './pages/Notes'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

