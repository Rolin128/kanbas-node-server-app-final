import mongoose from "mongoose";

const multipleChoiceSchema = new mongoose.Schema(
    {
        description: { type: String },
        answer: { type: [String] },
    },
    { _id: false }
);

const trueFalseSchema = new mongoose.Schema(
    {
        question: { type: String },
        answer: String,
    },
    { _id: false }
);

const fillBlankSchema = new mongoose.Schema(
    {
        description: { type: String },
        answer: String,
    },
    { _id: false }
);

const questionSchema = new mongoose.Schema({
    title: String,
    pts: Number,
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizzesModel" },
    questionType: {
        type: String,
        enum: ["multiple-choice", "fill-in-the-blank" , "true-false"],
        default: "multiple-choice",
    },
    type: {
        type: String,
        enum: ["multiple-choice", "fill-in-the-blank" , "true-false"],
        default: "multiple-choice",
    },
    multipleChoice: multipleChoiceSchema,
    trueFalse: trueFalseSchema,
    fillBlank: fillBlankSchema,
    description: { type: String }, 
    //answers: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible field for all answer types
    answers: [String],
},
{ collection: "questions" }
);

export default questionSchema;
