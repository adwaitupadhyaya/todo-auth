import { NotFoundError } from "./../error/NotFoundError";
import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as userService from "../service/user";
import { BadRequestError } from "../error/BadRequestError";
import HttpStatusCodes from "http-status-codes";

export async function getUsers(req: Request, res: Response) {
  const { query } = req;
  const data = await userService.getUsers(query);
  res.status(HttpStatusCodes.OK).json(data);
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const data = await userService.getUserById(id);
  console.log(data);
  if (data.length === 0) {
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
  const data = await userService.createUser(newUser);
  res.status(HttpStatusCodes.CREATED).json({
    message: "User Created Succesfully",
    data: data,
  });
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
  res.status(HttpStatusCodes.OK).json({
    message: "User Updated Successfully",
  });
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const data = await userService.deleteUser(id);
  console.log(data);
  if (data === null) {
    next(new NotFoundError(`User with id ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).json({ message: "User Deleted Succesfully" });
}
