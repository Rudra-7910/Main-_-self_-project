// ============================================================
// ThemeContext.jsx — Theme Context (Dark/Light Mode)
// ============================================================
//
// 📖 YE CONTEXT KYA KARTA HAI?
//    - Dark mode aur Light mode ko manage karta hai
//    - Puri app mein kahin se bhi theme access kar sakte ho
//    - localStorage mein save hota hai — page refresh pe bhi yaad rahega
//
// 📖 CONCEPTS COVERED:
//    1. createContext + Provider pattern (same as AuthContext)
//    2. useCallback — toggleTheme function memoize karna
//    3. useMemo — Context value memoize karna (re-render optimization)
//    4. useState with LAZY INITIALIZATION — initial value function se
//    5. useEffect — Side effect (localStorage sync)
//
// 📖 useState LAZY INITIALIZATION:
//    Normal:     useState("light")         ← har render pe "light" evaluate hota hai
//    Lazy:       useState(() => getValue()) ← sirf PEHLI BAAR function chalega
//    
//    Lazy initialization tab use karo jab initial value:
//    - localStorage se aaye (expensive operation)
//    - Koi calculation karna pade
//    - API se aaye (rare case)
// ============================================================

import { useState, useEffect, createContext, useCallback, useMemo } from "react";

// Context create karo — isko ThemeContext.Provider aur useContext(ThemeContext) mein use karenge
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // -------------------------------------------------------
  // useState with LAZY INITIALIZATION
  // -------------------------------------------------------
  // () => localStorage.getItem("theme") || "light"
  //
  // Ye function sirf PEHLI BAAR (mount pe) chalega
  // Baad ke renders mein React ye function call nahi karega
  //
  // Kyun? Kyunki localStorage.getItem() thoda slow hai
  // Har render pe call karna waste hai — sirf initial value chahiye
  //
  // SYNTAX:
  //   useState(initialValue)          ← har render pe evaluate hota hai
  //   useState(() => initialValue)    ← sirf pehli baar evaluate hota hai (LAZY)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // -------------------------------------------------------
  // useEffect — localStorage mein theme save karna
  // -------------------------------------------------------
  // Jab bhi theme change ho (dark ↔ light), localStorage update karo
  // [theme] dependency = sirf theme change hone pe chalega
  //
  // SIDE EFFECT: localStorage mein likhna = side effect hai
  // React components pure hone chahiye (sirf UI return karein)
  // Side effects (localStorage, API calls, timers) useEffect mein rakho
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // -------------------------------------------------------
  // useCallback — toggleTheme function memoize karna
  // -------------------------------------------------------
  // 📖 useCallback KYA KARTA HAI?
  //    Function ko MEMOIZE karta hai — same function reference milta hai har baar
  //    Bina useCallback: har render pe NAYA function banta hai
  //    useCallback ke saath: SAME function reference milta hai (jab tak deps same hain)
  //
  // 📖 KYUN ZAROORI HAI?
  //    Agar ye function child component ko prop mein dete hain:
  //    <ThemeToggle onToggle={toggleTheme} />
  //    → Bina useCallback: har render pe naya function → child bhi re-render
  //    → useCallback ke saath: same function → child re-render nahi hoga (agar React.memo hai)
  //
  // 📖 SYNTAX: const fn = useCallback(() => { ... }, [dependencies])
  //    → [] = function kabhi re-create nahi hoga
  //    → [dep1, dep2] = dep1 ya dep2 change ho tab re-create hoga
  const toggleTheme = useCallback(() => {
    // Functional update pattern: setTheme((prev) => newValue)
    // prev = current state value (React guarantee karta hai ye latest value hai)
    // Ye pattern tab use karo jab naya state purane state pe depend kare
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  }, []);
  // [] = empty deps = function kabhi re-create nahi hoga
  // Kyunki ye sirf setTheme use karta hai (jo stable hai — React guarantee)

  // -------------------------------------------------------
  // useMemo — Context value memoize karna
  // -------------------------------------------------------
  // Same optimization jo AuthContext mein bhi ki hai
  // Context value sirf tab change hogi jab dependencies change hon
  const contextValue = useMemo(() => ({
    theme,             // current theme ("light" ya "dark")
    setTheme,          // theme directly set karna (rare use)
    toggleTheme,       // light ↔ dark toggle karna
  }), [theme, toggleTheme]);
  // ^ theme change ho toh naya object, toggleTheme stable hai (useCallback se)

  return (
    <ThemeContext.Provider
      value={contextValue}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Named export — useContext(ThemeContext) ke liye
export { ThemeContext }

// Default export — App.jsx mein <ThemeProvider> ke liye
export default ThemeProvider