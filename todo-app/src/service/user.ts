import { IUser } from "../interface/user";
import * as userModel from "../model/user";

export function getUsers() {
  return userModel.getUsers();
}

export function createUser(
  newUser: Pick<IUser, "name" | "email" | "password">
) {
  userModel.createUser(newUser);
}

export function getUserByEmail(email: string) {
  return userModel.getUserByEmail(email);
}
