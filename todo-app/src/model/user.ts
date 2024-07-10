import { IUser } from "../interface/user";

import loggerWithNameSpace from "../utils/logger";

const loggerArea = "model";
const logger = loggerWithNameSpace("User Model");

let users: IUser[] = [
  {
    name: "adw8",
    email: "adw8@gmail.com",
    password: "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
    id: "1",
    permissions: ["superAdmin"],
  },
  {
    name: "adw",
    email: "adw@gmail.com",
    password: "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
    id: "2",
    permissions: [""],
  },
];

export function getUsers() {
  logger.info(`${loggerArea}: get users`);
  return users;
}

export function getUserById(id: string) {
  logger.info(`${loggerArea}: get users by id `);
  return users.find(({ id: userId }) => userId === id);
}

export function getUserByEmail(email: string) {
  logger.info(`${loggerArea}: get users by email`);
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function createUser(
  body: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  logger.info(`${loggerArea}: create users`);
  return users.push({ ...body, id: `${users.length + 1}` });
}

export function updateUser(id: string, body: Omit<IUser, "id">) {
  logger.info(`${loggerArea}: update users`);
  return (users = users.map((element) => {
    if (element.id === id) {
      element = { id, ...body };
      return element;
    }
    return element;
  }));
}

export function deleteUser(id: string) {
  logger.info(`${loggerArea}: delete users`);
  return (users = users.filter((element) => element.id !== id));
}
