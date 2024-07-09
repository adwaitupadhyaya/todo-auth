import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

export function auth(req: Request, res: Response, next: NextFunction) {
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
  verify(tokens[1], config.jwt.secret!);
  next();
}
