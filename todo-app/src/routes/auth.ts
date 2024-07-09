import express from "express";

import { signup, login } from "../controller/auth";

const router = express();

router.post("/signup", signup);
router.post("/login", login);

export default router;
