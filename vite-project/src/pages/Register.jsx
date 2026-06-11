import { useForm } from "react-hook-form"
import { registerUser } from "../services/authService"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = async (data) => {
    try {
      setError("")
      await registerUser(data)
      setSuccess("Registered! Redirecting to login...")
      setTimeout(() => navigate("/"), 1500)
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-3xl text-center font-bold">Register</h1>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <Input
            type="text"
            {...register("name", {
              required: "Name is required"
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required"
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 chars required"
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button variant="success" type="submit" className="w-full mt-5 rounded-2xl">
          Register
        </Button>
        <p className="text-sm text-center text-slate-500">
          Already have an account? <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
