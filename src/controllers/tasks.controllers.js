import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const { board_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM task INNER JOIN board ON task.board_id = board.id WHERE board.id = $1 ORDER BY task_id",
      [board_id]
    );
    const data = result.rows;
    console.log(data.length)
    res.render("index", { data });
    if (data.length === 0) {
      pool.query("insert into task (title, description, state, icon, board_id) values ('Task To Do', 'Work on a Challenge on devChallenge.io, learn TypeScript.', 'todo', 'https://img.icons8.com/doodle/48/books.png', $1)", [board_id]);
      res.redirect(`/${board_id}/tasks`);
    }
  } catch (error) {
    res.send("Error getting tasks");
    console.log(error);
  }
};

export const createTask = async (req, res) => {
  const { board_id } = req.params;
  const data = {
    title: "Task To Do",
    description: "Work on a Challenge on devChallenge.io, learn TypeScript.",
    icon: "https://img.icons8.com/doodle/48/books.png",
    status: "todo",
    board_id: board_id,
  };
  const { rowCount } = await pool.query(
    "INSERT INTO task (title, description, state, icon, board_id) VALUES ($1, $2, $3, $4, $5)",
    [data.title, data.description, data.status, data.icon, data.board_id]
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.redirect(`/${board_id}/tasks`);
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM task WHERE task_id = $1", [
    id,
  ]);
  const data = result.rows[0];
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.render("partials/task-form", { data });
};

export const updateTask = async (req, res) => {
  const { board_id, id } = req.params;
  const { title, description, icon, status } = req.body;
  await pool.query(
    "UPDATE task SET title = $1, description = $2, state= $3, icon = $4 WHERE task_id = $5 RETURNING *",
    [title, description, status, icon, id]
  );
  res.redirect(`/${board_id}/tasks`);
};

export const deleteTask = async (req, res) => {
  const { board_id, id } = req.params;
  console.log(board_id, id);
  const { rowCount } = await pool.query("DELETE FROM task WHERE task_id = $1", [
    id,
  ]);
  if (rowCount === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.redirect(`/${board_id}/tasks`);
};
