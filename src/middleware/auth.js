function checkBoardId(req, res, next) {
  const boardId_cookie = req.cookies.boardId;
  const boardId_params = req.params.board_id;

  if (boardId_cookie !== boardId_params) {
    res.status(403).send("Unauthorized");
  } else {
    next();
  }
}

export default checkBoardId;
