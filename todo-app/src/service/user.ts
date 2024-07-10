import { IUser } from "../interface/user";
import * as userModel from "../model/user";

export function getUsers() {
  return userModel.getUsers();
}

export function getUserById(id: string) {
  return userModel.getUserById(id);
}

export function createUser(
  newUser: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  userModel.createUser(newUser);
}

export function getUserByEmail(email: string) {
  return userModel.getUserByEmail(email);
}

export function updateUser(id: string, body: Omit<IUser, "id">) {
  const userToUpdate = userModel.getUserById(id);

  if (!userToUpdate) {
    return userToUpdate;
  }
  return userModel.updateUser(id, body);
}

export function deleteUser(id: string) {
  const userToDelete = userModel.getUserById(id);
  if (!userToDelete) {
    return userToDelete;
  }
  return userModel.deleteUser(id);
}
