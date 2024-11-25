import Database from "../Database/index.js";
export function findQuizzesForCourse(courseId) {
    const { quizzes } = Database;
    return quizzes.filter((quiz) => quiz.course === courseId);
}

export function createQuizzes(quiz) {
    const newQuiz= { ...quiz, _id: Date.now().toString() };
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
}
export function updateQuiz(quizId, quizUpdates) {
    const { quizzes } = Database;
    const quiz = quizzes.find(
      (quiz) => quiz._id === quizId
    );
    Object.assign(quiz, quizUpdates);
    return quiz;
  }

