import { Router } from "express";
import {
  updateBoard,
  showBoardForm,
  createBoard,
  getBoard
} from "../controllers/board.controllers.js";

const router = Router();

router.post("/board/:board_id/update", updateBoard);

router.get("/board/create", showBoardForm);

router.post("/board/create/:board_id", createBoard);

router.get("/board/:board_id", getBoard)

export default router;
