import express from "express";
import {
  createTodo,
  getTodoById,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todo";
import { authenticate } from "../middleware/auth";
import { validateReqBody } from "../middleware/validator";
import { createTodoSchema } from "../schema/todo";

const router = express();

router.get("/", authenticate, getTodos);
router.get("/:id", authenticate, getTodoById);
router.post("/", authenticate, validateReqBody(createTodoSchema), createTodo);
router.put("/:id", authenticate, validateReqBody(createTodoSchema), updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;
