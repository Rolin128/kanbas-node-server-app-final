import model from "./model.js";

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function createQuizzes(quiz) {
  delete quiz._id;
  return quiz.create(quiz);
}
export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}

export const findQuizById = async (quizId, courseId) => {
  return model.findOne({ _id: quizId });
};
