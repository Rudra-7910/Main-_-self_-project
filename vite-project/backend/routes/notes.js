import express from "express";
import auth from "../middleware/auth.js";
import Note from "../models/Note.js";

const router = express.Router();

// GET /api/notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/notes
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/notes/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
