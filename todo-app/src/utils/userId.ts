import { Request } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

export function extractUserId(req: Request) {
  const { authorization } = req.headers;
  const tokens = authorization!.split(" ");
  const decoded = verify(tokens[1], config.jwt.secret!);
  if (typeof decoded === "string") {
    return;
  }
  const id = decoded.id;

  return id;
}
