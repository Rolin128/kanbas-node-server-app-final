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
import * as attemptDao from "../Attempts/dao.js";

export default function QuizRoutes(app) {
  const getQuizAndAttempts = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      // Stop "read properties of undefined" from crashing server
      return res.sendStatus(401);
    }

    const { quizId } = req.params;
    let quiz = await quizzesDao.findQuizById(quizId);
    // Change Mongoose document object to JSON for modification
    quiz = quiz.toJSON();
    const attemptHistory = await attemptDao.getAttemptHistory(currentUser._id, quizId);
    quiz.attemptHistory = attemptHistory;
    if (!quiz.maxAttempts) {
      quiz.maxAttempts = 1; // TODO: remove this once max attempts is always set.
    }

    res.send(quiz);
  };

  // Find a quiz by courseId and quizId
  app.get("/api/courses/:courseId/quizzes/:quizId", getQuizAndAttempts);

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
  app.get("/api/quizzes/:quizId", getQuizAndAttempts);

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

  // Find all questions for a quiz with quiz mapping
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  // Find all questions for a quiz without quiz mapping
  app.get("/api/quizzes/:quizId/questions/takequiz", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionDao.findQuestionsForQuizNoPtsMapping(quizId);
    res.json(questions);
  });

  // Update a question by questionId
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const questionData = req.body;
    console.log("questionId01", questionId);
    const updatedQuestion = await questionDao.updateQuestion(questionId, questionData);
    res.send(updatedQuestion);
  });

  // Delete a question by questionId
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionDao.deleteQuestion(questionId);
    res.send(status);
  });

  // Attempt once by submitting answers
  app.post("/api/quizzes/:quizId/submitAnswers", async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      // Stop "read properties of undefined" from crashing server
      return res.sendStatus(401);
    }
    // TODO: check max attempts, recalculate score
    console.log(">>>submitAnswers", req.body);
    const status = await attemptDao.storeAttempt(currentUser._id, quizId, req.body);
    const attemptHistory = await attemptDao.getAttemptHistory(currentUser._id, quizId);
    res.send(status);
  });
}
