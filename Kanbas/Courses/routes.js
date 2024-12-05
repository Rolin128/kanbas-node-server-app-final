import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as usersDao from "../Users/dao.js";
import mongoose from "mongoose";
import * as quizzesDao from "../Quizzes/dao.js";


export default function CourseRoutes(app) {
  //fetch all the courses
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  //add course
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);  //自动注册上新添加的课程
    }
    res.json(course);
  });
  //TODO status是啥
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
  //update course
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  //fetch modules
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    console.log("courseId is:", courseId);
    console.log("req.params:", req.params);
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  //add new model
  app.post("/api/courses/:courseId/modules/addNewModel", async (req, res) => {
    const { courseId,addNewModel } = req.params;
    console.log("newmodule",addNewModel);
    console.log("courseIId",courseId);
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  //retrieve assignment
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
  app.post("/api/courses/:courseId/assignments/addNewAss", async (req, res) => {
    const { courseId,addNewAss } = req.params;
    console.log("addNewAss",addNewAss);
    const assignment = {
      ...req.body,
      course: courseId,
      // title: req.body.title,
      // description: req.body.description || "",
      // points: req.body.points || 100,
      // dueDate: req.body.dueDate || "2024-05-13T23:59",
      // availableFrom: req.body.availableFrom || "2024-05-06T23:59",
      // availableUntil: req.body.availableUntil || "2024-05-20T23:59",
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  //retrieve the quizzes for that course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });
  app.post("/api/courses/:courseId/quizzes/addNewQuiz", async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
      // title: req.body.title || "default",
      // points: req.body.points || 100,
      // due: req.body.due || "2024-05-13T23:59",
      // available: req.body.available || "2024-05-06T23:59",
      // until: req.body.until || "2024-05-20T23:59",
      // published: req.body.published || false,
    };
    const newQuiz = await quizzesDao.createQuizzes(quiz);
    res.send(newQuiz);
  });
}
