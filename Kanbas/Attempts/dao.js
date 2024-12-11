import model from "./model.js";

export async function getAttemptHistory(userId, quizId) {
  return await model.findOne({ user: userId, quiz: quizId });
}

export async function storeAttempt(userId, quizId, attempt) {
  let previousHistory = await getAttemptHistory(userId, quizId);
  if (previousHistory === null) {
    // create new attempt history
    delete attempt._id;
    attempt.user = userId;
    attempt.quiz = quizId;
    attempt.attemptsTaken = 1;
    attempt.lastAttemptTime = Date.now();
    return model.create(attempt);
  } else {
    // update attempt history, increment count by 1
    previousHistory.attemptsTaken += 1;
    previousHistory.lastAttemptTime = Date.now();
    previousHistory.lastAttemptScore = attempt.lastAttemptScore;
    previousHistory.lastAttemptAnswers += attempt.lastAttemptAnswers;
    return model.updateOne({ _id: previousHistory._id }, previousHistory);
  }
}
