import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  const findCourseQuizById = async (req, res) => {
    const { quizId, courseId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId, courseId);
    res.send(quiz);
  };

  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    quizzesDao.updateQuiz(quizId, quizUpdates);
    res.sendStatus(204);
  });
  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    quizzesDao.deleteQuiz(quizId);
    res.sendStatus(204);
  });

  app.get("/api/courses/:courseId/quizzes/:quizId", findCourseQuizById);
}
