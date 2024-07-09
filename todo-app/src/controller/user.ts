import { Request, Response } from "express";
import * as userService from "../service/user";

export function getUsers(req: Request, res: Response) {
  const data = userService.getUsers();
  res.json(data);
}
