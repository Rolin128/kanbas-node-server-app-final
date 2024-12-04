import mongoose from "mongoose";
const quizzesSchema = new mongoose.Schema({
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    due: String,
    available: String,
    until: String,
    points: Number,
    assignTo: String,
    published: Boolean,
    shuffleAnswers: Boolean,
    multipleAttempts: Boolean,
    lockScreen: Boolean,
    oneQuestion: Boolean,
    showCorrectAnswers: Boolean,
    webcamRequired: Boolean,
    timeLimit: Number,
    accessCode: String,
    quizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Projects"],
        default: "Quizzes",
    },
},
    { collection: "quizzes" }
);
export default quizzesSchema;
