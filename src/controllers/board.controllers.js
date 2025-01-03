import { pool } from "../db.js";

export const updateBoard = async (req, res) => {
  const { board_id } = req.params;
  const { board_name } = req.body;
  const data = await pool.query(
    "UPDATE board SET board_title = $1 WHERE id = $2",
    [board_name, board_id]
  );
  if (data.rowCount === 0) {
    return res.status(404).json({ message: "Board not found" });
  }
  res.redirect(`/board/${board_id}/tasks`);
};

export const showBoardForm = async (req, res) => {
  const result_max_id = await pool.query("SELECT max(id) FROM board;");
  const board_id_max = result_max_id.rows[0].max + 1;
  res.render("board", { board_id_max });
};

export const createBoard = async (req, res) => {
  try {
    const { board_id } = req.params;
    const data = await pool.query(
      "INSERT INTO board (board_title) VALUES ($1)",
      [req.body.board_name]
    );
    res.redirect(`/board/${board_id}/tasks`);
  } catch (error) {
    res.send("Error creating board");
    console.log(error);
  }
};

export const getBoard = async (req, res) => {
  const { board_id } = req.params;
  const result = await pool.query("SELECT id FROM board;");
  
  const boardExists = result.rows.some(row => row.id === parseInt(board_id));

  if(boardExists){
    res.redirect(`/board/${board_id}/tasks`);
  } else{
    res.redirect("/board/create");
  }
};
