import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizzesModel", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    attemptsTaken: Number,
    lastAttemptTime: Date,
    lastAttemptScore: Number,
    lastAttemptAnswers: { type: Map, of: String },
  },
  { collection: "attempts" }
);

export default attemptSchema;
