import { IUser } from "../interface/user";
import * as userModel from "../model/user";
import loggerWithNameSpace from "../utils/logger";

const loggerArea = "service";
const logger = loggerWithNameSpace("User Service");

export function getUsers() {
  logger.info(`${loggerArea}: get users`);
  return userModel.getUsers();
}

export function getUserById(id: string) {
  logger.info(`${loggerArea}: get users by id `);
  return userModel.getUserById(id);
}

export function createUser(
  newUser: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  logger.info(`${loggerArea}: create users`);
  return userModel.createUser(newUser);
}

export function getUserByEmail(email: string) {
  logger.info(`${loggerArea}: get users by email`);
  return userModel.getUserByEmail(email);
}

export function updateUser(id: string, body: Omit<IUser, "id">) {
  logger.info(`${loggerArea}: update users`);
  const userToUpdate = userModel.getUserById(id);

  if (!userToUpdate) {
    return userToUpdate;
  }
  return userModel.updateUser(id, body);
}

export function deleteUser(id: string) {
  logger.info(`${loggerArea}: delete users`);
  const userToDelete = userModel.getUserById(id);
  if (!userToDelete) {
    return userToDelete;
  }
  return userModel.deleteUser(id);
}
