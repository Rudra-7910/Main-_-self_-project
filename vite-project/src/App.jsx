import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/Authcontext'
import ThemeProvider from './context/ThemeContext'
import ProtectedRoute from './routes/ProtectedRouteComponent'
import DashboardLayout from './layout/DashboardLayout'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Habits from './pages/Habits'
import Notes from './pages/Notes'
import Settings from './pages/Settings'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
function App() {
  return (
    <ErrorBoundary>
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
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
export default App
