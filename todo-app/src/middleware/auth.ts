import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/user";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Error("Unauthenticated"));
    return;
  }
  const tokens = authorization.split(" ");
  if (tokens.length !== 2 || tokens[0] !== "Bearer") {
    next(new Error("Unauthenticated"));
    return;
  }

  try {
    const user = verify(tokens[1], config.jwt.secret!) as IUser;
    req.user = user;
  } catch (error) {
    next(new UnauthenticatedError("JWT expired"));
  }
  next();
}

export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (user.permissions == permission) {
      next(new UnauthenticatedError("Forbidden"));
      return;
    }

    next();
  };
}
