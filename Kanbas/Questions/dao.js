// import model from "./model.js";

// export function createQuestion(question) {
//     delete question._id
//     return model.create(question);
// }

export function findQuestionsForQuizNoPtsMapping(quizId) {
  return model.find({ quiz: quizId });
}

// export function deleteQuestion(questionId) {
//     return model.deleteOne({ _id: questionId });
// }

// export function updateQuestion(questionId, questionUpdates) {
//     return model.updateOne({ _id: questionId }, questionUpdates);
// }

import model from "./model.js";

// Helper function to map `pts` to `points`
function mapPtsToPoints(question) {
  if (!question) return null;
  const { pts, ...rest } = question.toObject(); // Use `.toObject()` for plain JavaScript object
  return { ...rest, points: pts }; // Add `points` field
}

export function createQuestion(question) {
  delete question._id;
  // Map `points` to `pts` for database
  if (question.points !== undefined) {
    question.pts = question.points;
    delete question.points; // Remove `points` to avoid redundancy
  }
  return model.create(question);
}

export async function findQuestionsForQuiz(quizId) {
  const questions = await model.find({ quiz: quizId });
  return questions.map(mapPtsToPoints); // Map each question
}

export async function findQuestionById(questionId) {
  const question = await model.findById(questionId);
  return mapPtsToPoints(question); // Map single question
}

export async function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

export async function updateQuestion(questionId, questionUpdates) {
  // Map `points` to `pts` for database
  if (questionUpdates.points !== undefined) {
    questionUpdates.pts = questionUpdates.points;
    delete questionUpdates.points; // Remove `points`
  }
  return model.updateOne({ _id: questionId }, questionUpdates);
}
