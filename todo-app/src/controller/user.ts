import { NotFoundError } from "./../error/NotFoundError";
import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as userService from "../service/user";
import { BadRequestError } from "../error/BadRequestError";
import HttpStatusCodes from "http-status-codes";

export function getUsers(req: Request, res: Response) {
  const data = userService.getUsers();
  res.status(HttpStatusCodes.OK).json(data);
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = userService.getUserById(id);
  if (!data) {
    next(new BadRequestError(`User with id ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).json(data);
}

export async function createUser(req: Request, res: Response) {
  const { body } = req;
  const password = await bcrypt.hash(body.password, 10);
  const newUser = {
    ...body,
    password,
  };
  const data = userService.createUser(newUser);
  res.status(HttpStatusCodes.CREATED).json(data);
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { body } = req;
  const password = await bcrypt.hash(body.password, 10);
  const updatedUser = {
    ...body,
    password,
  };
  const data = userService.updateUser(id, updatedUser);
  if (!data) {
    next(new BadRequestError(`User with id ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).json(data);
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = userService.deleteUser(id);
  if (!data) {
    next(new NotFoundError(`User with id ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).json(data);
}
