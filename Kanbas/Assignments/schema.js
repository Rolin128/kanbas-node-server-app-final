import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        available: String,
        due: String,
        points: String,
        until: String,
    },
    { collection: "assignments" }
);
export default AssignmentSchema;