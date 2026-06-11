import { useContext, createContext, useEffect, useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState({
    user: null,
    accessToken: null
  })
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    if (user && token) {
      setisAuthenticated({
        user: user,
        accessToken: token
      })
    }
    setLoading(false);
  }, [])
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setisAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext }
export default AuthProvider
