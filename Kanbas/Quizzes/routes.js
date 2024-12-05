import * as quizzesDao from "./dao.js";
import * as questionDao from "../Questions/dao.js";

export default function QuizRoutes(app) {
  const findCourseQuizById = async (req, res) => {
    const { quizId, courseId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId, courseId);
    res.send(quiz);
  };

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDao.deleteQuiz(quizId);
    res.send(status);
  });

  app.get("/api/courses/:courseId/quizzes/:quizId", findCourseQuizById);

  app.post("/api/Quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = {
      ...req.body,
      quiz: quizId,
    };
    const newQuestion = await questionDao.createQuestion(question);
    res.send(newQuestion);
  });

  app.get("/api/Quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });
}
