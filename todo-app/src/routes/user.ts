import express from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controller/user";
import { auth } from "../middleware/auth";

const router = express();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.post("/", auth, createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
