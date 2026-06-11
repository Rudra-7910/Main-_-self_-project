import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedDates: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model("Habit", habitSchema);
