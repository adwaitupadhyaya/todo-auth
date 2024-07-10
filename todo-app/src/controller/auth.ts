import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as AuthService from "../service/auth";
import HttpStatusCodes from "http-status-codes";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

export function signup(req: Request, res: Response) {
  const { body } = req;
  AuthService.signup(body);
  res.status(HttpStatusCodes.CREATED).json({
    message: "user created successfully",
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const data = await AuthService.login(body);

  if (!data) {
    next(new NotFoundError(`Invalid email or password`));
    return;
  }

  res.status(HttpStatusCodes.OK).json(data);
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const data = await AuthService.refresh(body);

  if (!data) {
    console.log("no refresh token");
    next(new BadRequestError("Refresh Token is necessary"));
    return;
  }
  res.status(HttpStatusCodes.OK).json(data);
}
