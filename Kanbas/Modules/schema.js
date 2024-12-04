import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        module: { type: String }
    }
);

const moduleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        lessons: [lessonSchema]
    },
    { 
        collection: "modules" 
    }
);

export default moduleSchema;