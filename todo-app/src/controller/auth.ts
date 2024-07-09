import { Request, Response } from "express";
import * as AuthService from "../service/auth";

export function signup(req: Request, res: Response) {
  const { body } = req;
  AuthService.signup(body);
  res.json({
    message: "user created successfully",
  });
}

export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);
  res.json(data);
}

export async function refresh(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.refresh(body);
  res.json(data);
}
