import { Router } from "express";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/board/:board_id/tasks", getTasks);

router.post("/board/:board_id/tasks", createTask);

router.get("/board/:board_id/tasks/:id", getTask);

router.post("/board/:board_id/tasks/:id", updateTask);

router.get("/board/:board_id/tasks/delete/:id", deleteTask);



export default router;
