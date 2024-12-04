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
        answer: Boolean,
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
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizzesModel" },
    questionType: {
        type: String,
        enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
        default: "Multiple Choice",
    },
    multipleChoice: multipleChoiceSchema,
    trueFalse: trueFalseSchema,
    fillBlank: fillBlankSchema
},
{ collection: "questions" }
);

export default questionSchema;
