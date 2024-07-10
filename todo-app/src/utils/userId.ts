import { Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

export function extractUserId(req: Request) {
  const { authorization } = req.headers;
  const tokens = authorization!.split(" ");
  const decoded = verify(tokens[1], config.jwt.secret!) as JwtPayload;
  const id = decoded.id;
  return id;
}
