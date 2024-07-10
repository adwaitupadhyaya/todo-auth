import express from "express";
import {
  createTodo,
  getTodoById,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todo";
import { authenticate } from "../middleware/auth";

const router = express();

router.get("/", authenticate, getTodos);
router.get("/:id", authenticate, getTodoById);
router.post("/", authenticate, createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;
