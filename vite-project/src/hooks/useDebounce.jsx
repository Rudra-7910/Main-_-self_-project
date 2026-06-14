// 📖 DEBOUNCE KYA HAI?
//    Jab user search bar mein type kar raha ho, har keystroke pe filter karna
//    performance ke liye bura hai. Debounce ka matlab hai:
//    "User jab type karna BAND kare, tab filter karo"
//
//    Example: User type karta hai "react"
//    Bina debounce: r → re → rea → reac → react (5 baar filter hoga) ❌
//    Debounce (300ms): ......react (sirf 1 baar filter hoga, 300ms baad) ✅

import { useState, useEffect } from "react"

function useDebounce(value, delay = 300) {
  // debouncedValue — ye "delayed" value hai
  // Ye tabhi update hogi jab user "delay" ms tak type na kare
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // -------------------------------------------------------
    // SETUP: Timer set karo
    // -------------------------------------------------------
    // setTimeout → "delay" ms baad function chalega
    // Jab tak user type kar raha hai, har baar naya timer lagega
    // aur purana cancel ho jayega (cleanup se)
    const timer = setTimeout(() => {
      setDebouncedValue(value)   // delayed value update karo
    }, delay)

    // -------------------------------------------------------
    // CLEANUP: Purana timer cancel karo
    // -------------------------------------------------------
    // Jab value change ho, ye cleanup function chalega PEHLE
    // Phir naya timer set hoga (upar wala code)
    //
    // Flow: User types "r" → timer starts → User types "e" (before 300ms)
    //       → cleanup clears "r" timer → new timer for "re" starts
    //       → User stops typing → 300ms baad "re" set hoga
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  // ^ [value, delay] = jab value ya delay change ho tab re-run karo
  // Har keystroke pe value change hoti hai → effect re-run hota hai
  // → pehle cleanup (clear old timer) → phir setup (new timer)

  // Debounced value return karo
  // Ye value "delay" ms baad update hogi
  return debouncedValue
}

export default useDebounce
