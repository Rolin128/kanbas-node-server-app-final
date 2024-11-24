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

