import { useContext, createContext, useEffect, useState, useMemo } from "react";
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
  const contextValue = useMemo(() => ({
    isAuthenticated,  
    setisAuthenticated,  
    loading, 
  }), [isAuthenticated, loading])
  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext }
export default AuthProvider
