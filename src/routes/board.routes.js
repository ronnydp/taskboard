import { Router } from "express";
import {
  updateBoard,
  createBoard,
  getBoard
} from "../controllers/board.controllers.js";

const router = Router();

router.get("/", getBoard)

router.post("/:board_id/update", updateBoard);

router.get("/create", createBoard);

export default router;
