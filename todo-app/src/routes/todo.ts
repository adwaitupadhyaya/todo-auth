import express from "express";
import {
  createTodo,
  getTodoById,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todo";
import { auth } from "../middleware/auth";

const router = express();

router.get("/", auth, getTodos);
router.get("/:id", auth, getTodoById);
router.post("/", auth, createTodo);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

export default router;
