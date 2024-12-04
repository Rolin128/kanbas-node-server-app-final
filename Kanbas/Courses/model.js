import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("CourseModel", schema); //CourseModel in the mongoose model declares a unique name that can be used as a reference from other mongoose schemas.
export default model;