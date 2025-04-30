const express = require("express");
const {
  getTidnos,
  createTidno,
  updateTidno,
  deleteTidno,
} = require("../controllers/tidnoController");

const tidnoRouter = express.Router();

tidnoRouter.get("/", getTidnos);
tidnoRouter.post("/", createTidno);
tidnoRouter.patch("/:id", updateTidno);
tidnoRouter.delete("/:id", deleteTidno);

module.exports = tidnoRouter;
