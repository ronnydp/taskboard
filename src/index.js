import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config.js";
import tasksRouter from "./routes/tasks.routes.js";
import boardRouter from "./routes/board.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

app.use(tasksRouter);
app.use(boardRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
