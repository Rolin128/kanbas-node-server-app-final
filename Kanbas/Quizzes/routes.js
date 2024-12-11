// import * as quizzesDao from "./dao.js";
// import * as questionDao from "../Questions/dao.js";

// export default function QuizRoutes(app) {
//   const findCourseQuizById = async (req, res) => {
//     const { quizId, courseId } = req.params;
//     const quiz = await quizzesDao.findQuizById(quizId, courseId);
//     res.send(quiz);
//   };

//   app.put("/api/quizzes/:quizId", async (req, res) => {
//     const { quizId } = req.params;
//     const quizUpdates = req.body;
//     const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
//     res.send(status);
//   });
//   app.delete("/api/quizzes/:quizId", async (req, res) => {
//     const { quizId } = req.params;
//     const status = await quizzesDao.deleteQuiz(quizId);
//     res.send(status);
//   });

//   app.get("/api/courses/:courseId/quizzes/:quizId", findCourseQuizById);

//   app.post("/api/Quizzes/:quizId/questions", async (req, res) => {
//     const { quizId } = req.params;
//     const question = {
//       ...req.body,
//       quiz: quizId,
//     };
//     const newQuestion = await questionDao.createQuestion(question);
//     res.send(newQuestion);
//   });

//   app.get("/api/Quizzes/:quizId/questions", async (req, res) => {
//     const { quizId } = req.params;
//     const questions = await questionDao.findQuestionsForQuiz(quizId);
//     res.json(questions);
//   });
// }

import * as quizzesDao from "./dao.js";
import * as questionDao from "../Questions/dao.js";

export default function QuizRoutes(app) {
  // Find a quiz by courseId and quizId
  app.get("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
    const { courseId, quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId, courseId);
    res.send(quiz);
  });

  // // Create a quiz for a specific course
  // app.post("/api/courses/:courseId/quizzes", async (req, res) => {
  //   const { courseId } = req.params;
  //   const quiz = await quizzesDao.createQuiz(courseId, req.body);
  //   res.send(quiz);
  // });

  // Update a quiz by quizId
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });

  // Delete a quiz by quizId
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDao.deleteQuiz(quizId);
    res.send(status);
  });

  // Find a quiz by quizId
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);
    res.send(quiz);
  });

  // Create a question for a quiz
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = {
      ...req.body,
      quiz: quizId,
    };
    const newQuestion = await questionDao.createQuestion(question);
    res.send(newQuestion);
  });

  // Find all questions for a quiz
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  // Update a question by questionId
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const questionData = req.body;
    console.log("questionId01",questionId);
    const updatedQuestion = await questionDao.updateQuestion(questionId, questionData);
    res.send(updatedQuestion);
  });

  // Delete a question by questionId
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionDao.deleteQuestion(questionId);
    res.send(status);
  });
}
