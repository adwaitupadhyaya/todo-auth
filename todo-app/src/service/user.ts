import { GetUserQuery, IUser } from "../interface/user";
import * as userModel from "../model/user";
import loggerWithNameSpace from "../utils/logger";
const loggerArea = "service";
const logger = loggerWithNameSpace("User Service");

export async function getUsers(query: GetUserQuery) {
  logger.info(`${loggerArea}: get users`);
  const data = await userModel.UserModel.getUsers(query);
  const count = await userModel.UserModel.count();
  const meta = {
    page: 1,
    size: data.length,
    total: +count.count,
  };

  return { data, meta };
}

export function getUserById(id: string) {
  logger.info(`${loggerArea}: get users by id `);
  return userModel.UserModel.getUserById(id);
}

export async function createUser(
  newUser: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  logger.info(`${loggerArea}: create users`);
  return await userModel.UserModel.create(newUser);
}

export function getUserByEmail(email: string) {
  logger.info(`${loggerArea}: get users by email`);
  return userModel.UserModel.getUserByEmail(email);
}

export async function updateUser(id: string, body: Omit<IUser, "id">) {
  logger.info(`${loggerArea}: update users`);
  const userToUpdate = await userModel.UserModel.getUserById(id);

  if (!userToUpdate) {
    return userToUpdate;
  }

  return await userModel.UserModel.update(id, body);
}

export async function deleteUser(id: string) {
  logger.info(`${loggerArea}: delete users`);
  const userToDelete = await userModel.UserModel.getUserById(id);
  if (userToDelete.length === 0) {
    return null;
  }
  await userModel.UserModel.delete(id);
}
