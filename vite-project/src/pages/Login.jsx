import { useForm } from "react-hook-form"
import { loginUser } from "../services/authService"
import useAuth from "../hooks/useAuth"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"

function Login() {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm()
  const { setisAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const onSubmit = async (data) => {
    try {
      setError("")
      const res = await loginUser(data)
      localStorage.setItem("accessToken", res.token)
      localStorage.setItem("user", res.user)
      setisAuthenticated({
        user: res.user,
        accessToken: res.token
      })
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-3xl text-center">LOGIN</h1>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters"
              }
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button variant="success" type="submit" className="w-full rounded-2xl">
          Login
        </Button>
        <p className="text-sm text-center text-slate-500">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
