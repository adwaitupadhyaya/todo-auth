import express from "express";
import todoRoutes from "./todo";
import userRoutes from "./user";
import authRoutes from "./auth";

const router = express();

router.use("/auth", authRoutes);
router.use("/todo", todoRoutes);
router.use("/users", userRoutes);

export default router;
