import { useState, useEffect, createContext } from "react";
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });
    useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };
   return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext}
  export default ThemeProvider