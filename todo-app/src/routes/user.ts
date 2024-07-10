import express from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controller/user";
import { auth, authorize } from "../middleware/auth";

const router = express();

router.get("/", auth, authorize("superAdmin"), getUsers);
router.get("/:id", auth, authorize("superAdmin"), getUserById);
router.post("/", auth, authorize("superAdmin"), createUser);
router.put("/:id", auth, authorize("superAdmin"), updateUser);
router.delete("/:id", auth, authorize("superAdmin"), deleteUser);

export default router;
