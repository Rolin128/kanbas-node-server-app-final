import * as questionsDao from "./dao.js";
export default function QuestionRoutes(app) {
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionsDao.deleteQuestion(questionId);
    res.send(status);
  });
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const status = await questionsDao.updateQuestion(questionId, questionUpdates);
    res.send(status);
  });

  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    try {
      const question = await dao.createQuestion(quizId, req.body);
      res.json(question);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const deleteQuestion = async (req, res) => {
    try {
      const status = await dao.deleteQuestion(req.params.questionId);
      res.json(status);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      const status = await dao.updateQuestion(req.params.questionId, req.body);
      res.json(status);
    } catch (err) {
      console.log("An error occured while question update:" + err);
      res.status(500).send(err);
    }
  };

  const findQuestionsByQuizId = async (req, res) => {
    try {
      const { quizId } = req.params;
      const questions = await dao.findQuestionsByQuizId(quizId);
      console.log(questions.json);
      res.json(questions);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const findQuestionById = async (req, res) => {
    try {
      const question = await dao.findQuestionById(req.params.questionId);
      if (question) {
        res.json(question);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

  app.post("/api/quizzes/:quizId/questions", createQuestion);
  // uncomment if needed
  //   app.delete("/api/questions/:questionId", deleteQuestion);
  //   app.put("/api/questions/:questionId", updateQuestion);
  app.get("/api/quizzes/:quizId/questions", findQuestionsByQuizId);
  app.get("/api/questions/:questionId", findQuestionById);
}
