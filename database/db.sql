CREATE TYPE state AS ENUM ('todo', 'inprogress', 'completed', 'wontdo');

CREATE TABLE board (
    id SERIAL PRIMARY KEY,
    board_title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    state state DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    icon VARCHAR(255),
    board_id INT,
    FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE
)

-- TRIGGER PARA TAREAS POR DEFECTO
CREATE OR REPLACE FUNCTION create_default_task()
RETURNS TRIGGER AS $$
BEGIN
    -- insertar tareas por defecto en relacion con la tabla board
    INSERT INTO task (title, description, state, icon, board_id)
    VALUES
        ('Task in Progress', '', 'inprogress', 'https://img.icons8.com/emoji/48/alarm-clock-emoji.png', NEW.id),
        ('Task Completed', '', 'completed', 'https://img.icons8.com/emoji/48/man-lifting-weights.png', NEW.id),
        ('Task Won''t Do', '', 'wontdo', 'https://img.icons8.com/emoji/48/hot-beverage.png', NEW.id),
        ('Task To Do', 'Work on a Challenge on devChallenge.io, learn TypeScript.', 'todo', 'https://img.icons8.com/doodle/48/books.png', NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_board_insert
AFTER INSERT ON board
FOR EACH ROW
EXECUTE FUNCTION create_default_task();