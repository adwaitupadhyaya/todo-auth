import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUser } from "../interface/user";
import * as UserService from "../service/user";
import config from "../config";
import { verify } from "jsonwebtoken";

export async function signup(
  body: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  const password = await bcrypt.hash(body.password, 10);
  const newUser = {
    ...body,
    password,
  };
  UserService.createUser(newUser);
}

export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = UserService.getUserByEmail(body.email);

  if (!existingUser) {
    return {
      error: "No user with that email exists",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid Password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
  return {
    accessToken,
    refreshToken,
  };
}

export async function refresh(body: { refreshToken: string }) {
  const { refreshToken } = body;

  if (!refreshToken) {
    return {
      error: "Refresh token is necessary",
    };
  }
  const decoded = verify(refreshToken, config.jwt.secret!);
  if (typeof decoded === "string") {
    return;
  }

  const payload = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  return { accessToken };
}
