import { pool } from "../db.js";

export const getBoard = async (req, res) => {
  const board_id = req.cookies.boardId;

  if(board_id){
    res.redirect(`/${board_id}/tasks`);
  } else{
    res.redirect("/create");
  }
};

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
  res.redirect(`/${board_id}/tasks`);
};

export const createBoard = async (req, res) => {
  try {
    const result_max_id = await pool.query("SELECT max(id) FROM board;");
    const board_id = result_max_id.rows[0].max + 1;
    const board_name = "My Task Board";
    // const { board_id } = req.params;
    await pool.query(
      "INSERT INTO board (board_title) VALUES ($1)",
      [board_name]
    );
    res.cookie("boardId", board_id, { maxAge: 900000, httpOnly: true });
    res.redirect(`/`);
  } catch (error) {
    res.send("Error creating board");
    console.log(error);
  }
};