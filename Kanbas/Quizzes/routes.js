import * as quizzesDao from "./dao.js";
export default function QuizRoutes(app) {
  
    app.put("/api/Quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        quizzesDao.updateAssignment(quizId, quizUpdates);
        res.sendStatus(204);
    });

}