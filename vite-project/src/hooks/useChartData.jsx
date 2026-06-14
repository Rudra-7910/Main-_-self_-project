// ============================================================
// useChartData.jsx — Custom Hook: Chart Data Prepare Karna
// ============================================================
//
// 📖 YE HOOK KYA KARTA HAI?
//    Raw data (habits, notes, tasks) ko chart-ready format mein convert karta hai
//    Chart.js ko specific format chahiye — ye hook wo format banata hai
//
// 📖 CONCEPTS COVERED:
//    1. CUSTOM HOOK — Reusable logic ko hook mein wrap karna
//       → "use" se start hona ZAROORI hai (React ka rule)
//       → Andar useState, useMemo, useEffect — sab use kar sakte ho
//       → Component se logic alag karna = SEPARATION OF CONCERNS
//
//    2. useMemo — EXPENSIVE CALCULATION memoize karna
//       → Jab tak dependencies same hain, PURANA result return karega
//       → Har render pe dubara calculate nahi karega (performance boost)
//       → Chart data prepare karna = expensive hai, isliye useMemo perfect hai
//
//    3. DATA TRANSFORMATION — Raw data → Chart format
//       → Array.reduce() — array ko single value mein convert karna
//       → Object.keys(), Object.values() — object se arrays banana
//       → Date manipulation — dates ko readable format mein laana
//
// 📖 useMemo vs useCallback:
//    useMemo(() => value, [deps])    → VALUE memoize karta hai (computed data)
//    useCallback(() => {}, [deps])   → FUNCTION memoize karta hai (event handlers)
//
//    RULE OF THUMB:
//    → Data compute karna hai? → useMemo
//    → Function stable rakhna hai? → useCallback
// ============================================================

import { useMemo } from "react"

// -------------------------------------------------------
// CUSTOM HOOK — useChartData
// -------------------------------------------------------
// Parameters:
//   habits → array of habit objects [{name, completedDates: [...]}]
//   notes  → array of note objects [{title, createdAt}]
//   tasks  → array of task objects [{text, completed, priority}]
//
// Returns:
//   { habitChartData, noteChartData, taskChartData, overviewData }
//   → Ye sab Chart.js ke format mein ready data hai
function useChartData(habits = [], notes = [], tasks = []) {

  // -------------------------------------------------------
  // 1. HABIT COMPLETION CHART — Bar Chart Data
  // -------------------------------------------------------
  // Har habit ka naam + kitne din complete kiya → Bar chart mein dikhayenge
  //
  // useMemo kyun?
  // → habits array change na ho toh dubara calculate kyun karein?
  // → Chart data banana mein .map(), .length calls hain — ye har render pe repeat nahi hone chahiye
  const habitChartData = useMemo(() => {
    if (!habits.length) return null

    // -------------------------------------------------------
    // Chart.js DATA FORMAT:
    // {
    //   labels: ["Exercise", "Reading"],     ← X-axis pe dikhega
    //   datasets: [{
    //     label: "Title",                     ← Legend mein dikhega
    //     data: [5, 3],                       ← Y-axis values
    //     backgroundColor: [...]              ← Bar colors
    //   }]
    // }
    // -------------------------------------------------------
    return {
      labels: habits.map(h => h.name),                        // habit names → X-axis
      datasets: [{
        label: "Days Completed",
        // completedDates array ki length = kitne din complete kiya
        data: habits.map(h => 
          Array.isArray(h.completedDates) ? h.completedDates.length : 0
        ),
        // RGBA colors — last value = opacity (0.7 = 70% transparent)
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",   // Indigo
          "rgba(34, 197, 94, 0.7)",    // Green
          "rgba(249, 115, 22, 0.7)",   // Orange
          "rgba(236, 72, 153, 0.7)",   // Pink
          "rgba(14, 165, 233, 0.7)",   // Sky
          "rgba(168, 85, 247, 0.7)",   // Purple
          "rgba(234, 179, 8, 0.7)",    // Yellow
          "rgba(239, 68, 68, 0.7)",    // Red
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,      // rounded bars — Chart.js feature
      }]
    }
  }, [habits])
  // ^ [habits] = sirf habits array change ho tab recalculate

  // -------------------------------------------------------
  // 2. NOTES TIMELINE — Line Chart Data
  // -------------------------------------------------------
  // Last 7 din mein kitne notes banaye → Line chart mein trend dikhayenge
  //
  // 📖 Array.reduce() — IMPORTANT METHOD:
  //    array.reduce((accumulator, currentItem) => { ... }, initialValue)
  //    → Pura array traverse karke EK value banata hai
  //    → accumulator = build hota rehta hai har step pe
  //    → currentItem = current array element
  //
  //    Example: [1, 2, 3].reduce((sum, num) => sum + num, 0) → 6
  const noteChartData = useMemo(() => {
    // Last 7 din ke labels banao ("Mon", "Tue", etc.)
    const last7Days = []
    const dayCounts = {}

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // toLocaleDateString options:
      // weekday: "short" → "Mon", "Tue"
      // month: "short" → "Jan", "Feb"  
      // day: "numeric" → 1, 2, 3
      const label = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      const dateKey = date.toISOString().split("T")[0]   // "2025-06-11" format

      last7Days.push(label)
      dayCounts[dateKey] = 0    // initial count = 0
    }

    // Notes ko dates mein count karo
    // 📖 OPTIONAL CHAINING (?.) — Agar property exist nahi kare toh error nahi aayegi
    //    note.createdAt?.split("T") → agar createdAt undefined hai toh undefined return hoga (crash nahi)
    notes.forEach(note => {
      const noteDate = note.createdAt?.split("T")[0]
      if (noteDate && dayCounts[noteDate] !== undefined) {
        dayCounts[noteDate]++
      }
    })

    return {
      labels: last7Days,
      datasets: [{
        label: "Notes Created",
        data: Object.values(dayCounts),       // counts array
        borderColor: "rgba(99, 102, 241, 1)",  // line color
        backgroundColor: "rgba(99, 102, 241, 0.1)",  // area fill
        tension: 0.4,          // line curvature (0 = straight, 1 = very curved)
        fill: true,            // area below line fill karo
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,   // hover pe bada point
      }]
    }
  }, [notes])

  // -------------------------------------------------------
  // 3. TASK STATUS — Doughnut Chart Data
  // -------------------------------------------------------
  // Kitne tasks complete vs pending → Doughnut chart
  //
  // 📖 .filter().length PATTERN:
  //    array.filter(condition).length → kitne items condition satisfy karte hain
  //    tasks.filter(t => t.completed).length → completed tasks count
  const taskChartData = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length
    const pending = tasks.filter(t => !t.completed).length

    if (completed === 0 && pending === 0) return null

    return {
      labels: ["Completed ✅", "Pending ⏳"],
      datasets: [{
        data: [completed, pending],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",    // Green = completed
          "rgba(249, 115, 22, 0.8)",   // Orange = pending
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 10,    // hover pe slice bahar aayegi
      }]
    }
  }, [tasks])

  // -------------------------------------------------------
  // 4. TASK PRIORITY — Pie Chart Data
  // -------------------------------------------------------
  // Priority-wise breakdown → Pie chart
  //
  // 📖 REDUCE for GROUPING:
  //    reduce ka ek powerful use = items ko groups mein count karna
  //    { high: 3, medium: 5, low: 2 } ← ye structure reduce se bana
  const taskPriorityData = useMemo(() => {
    if (!tasks.length) return null

    // reduce se priority-wise count karo
    // acc = accumulator object { high: 0, medium: 0, low: 0 }
    // task = current task
    const priorityCounts = tasks.reduce((acc, task) => {
      const priority = task.priority || "medium"    // default = medium
      acc[priority] = (acc[priority] || 0) + 1      // count increment
      return acc
    }, {})

    const priorityColors = {
      high: "rgba(239, 68, 68, 0.8)",      // Red
      medium: "rgba(234, 179, 8, 0.8)",    // Yellow
      low: "rgba(34, 197, 94, 0.8)",       // Green
    }

    const priorityBorders = {
      high: "rgba(239, 68, 68, 1)",
      medium: "rgba(234, 179, 8, 1)",
      low: "rgba(34, 197, 94, 1)",
    }

    // Object.keys() → ["high", "medium", "low"]
    // Object.values() → [3, 5, 2]
    const labels = Object.keys(priorityCounts).map(
      p => p.charAt(0).toUpperCase() + p.slice(1) + " Priority"
    )

    return {
      labels,
      datasets: [{
        data: Object.values(priorityCounts),
        backgroundColor: Object.keys(priorityCounts).map(p => priorityColors[p] || "rgba(148, 163, 184, 0.8)"),
        borderColor: Object.keys(priorityCounts).map(p => priorityBorders[p] || "rgba(148, 163, 184, 1)"),
        borderWidth: 2,
        hoverOffset: 10,
      }]
    }
  }, [tasks])

  // -------------------------------------------------------
  // 5. OVERVIEW STATS — Summary numbers
  // -------------------------------------------------------
  const overviewStats = useMemo(() => ({
    totalHabits: habits.length,
    totalNotes: notes.length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    // Completion percentage — Math.round() se integer banao
    completionRate: tasks.length > 0
      ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
      : 0,
  }), [habits, notes, tasks])

  // -------------------------------------------------------
  // RETURN — Sab chart data ek object mein return karo
  // -------------------------------------------------------
  // 📖 Object shorthand property:
  //    { habitChartData: habitChartData } → { habitChartData }
  //    Jab key aur variable ka naam same ho, shorthand use karo
  return {
    habitChartData,
    noteChartData,
    taskChartData,
    taskPriorityData,
    overviewStats,
  }
}

export default useChartData
