import express from "express";
import auth from "../middleware/auth.js";
import Habit from "../models/Habit.js";

const router = express.Router();

// GET /api/habits
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/habits
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const habit = await Habit.create({
      name,
      user: req.user.id,
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/habits/:id/toggle
router.put("/:id/toggle", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date().toISOString().split("T")[0];
    if (habit.completedDates.includes(today)) {
      habit.completedDates = habit.completedDates.filter((d) => d !== today);
    } else {
      habit.completedDates.push(today);
    }

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/habits/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
