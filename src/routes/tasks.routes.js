import { Router } from "express";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/tasks.controllers.js";
import checkBoardId from "../middleware/auth.js";

const router = Router();

router.get("/:board_id/tasks", getTasks);

router.post("/:board_id/tasks", checkBoardId, createTask);

router.get("/:board_id/tasks/:id", checkBoardId, getTask);

router.post("/:board_id/tasks/:id", checkBoardId, updateTask);

router.get("/:board_id/tasks/delete/:id", checkBoardId, deleteTask);

export default router;
