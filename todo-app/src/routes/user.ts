import express from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody } from "../middleware/validator";
import { createUserBodySchema } from "../schema/user";

const router = express();

router.get("/", authenticate, authorize("superAdmin"), getUsers);
router.get("/:id", authenticate, authorize("superAdmin"), getUserById);
router.post(
  "/",
  authenticate,
  authorize("superAdmin"),
  validateReqBody(createUserBodySchema),
  createUser
);
router.put(
  "/:id",
  authenticate,
  authorize("superAdmin"),
  validateReqBody(createUserBodySchema),
  updateUser
);
router.delete("/:id", authenticate, authorize("superAdmin"), deleteUser);

export default router;
