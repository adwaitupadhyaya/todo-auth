import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as userService from "../service/user";
import { BadRequestError } from "../error/BadRequestError";

export function getUsers(req: Request, res: Response) {
  const data = userService.getUsers();
  res.json(data);
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = userService.getUserById(id);
  if (!data) {
    next(new BadRequestError(`User with id ${id} not found`));
    return;
  }
  res.json(data);
}

export function createUser(req: Request, res: Response) {
  const { body } = req;
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { body } = req;
  const data = userService.updateUser(id, body);
  if (!data) {
    next(new BadRequestError(`User with id ${id} not found`));
    return;
  }
  res.json(data);
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = userService.deleteUser(id);
  if (!data) {
    next(new BadRequestError(`User with id ${id} not found`));
    return;
  }
  res.json(data);
}
