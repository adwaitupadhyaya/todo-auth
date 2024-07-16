import { query } from "express";
import { GetUserQuery, IUser } from "../interface/user";

import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  static async create(
    user: Pick<IUser, "name" | "email" | "password" | "permissions">
  ) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const query = this.queryBuilder().insert(userToCreate).table("users");
    const data = await query;

    if (user.permissions) {
      const emailQuery = await this.queryBuilder()
        .select("id")
        .table("users")
        .where({ email: userToCreate.email })
        .first();
      const id = await emailQuery;

      await this.queryBuilder()
        .insert({
          user_id: id.id,
          permission: user.permissions,
        })
        .table("permissions");
    }
    return user;
  }

  static async update(id: string, body: Omit<IUser, "id">) {
    const userToUpdate = {
      name: body.name,
      email: body.email,
      password: body.password,
      updatedAt: new Date(),
    };

    const query = this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({ id });

    console.log(query.toString());
    await query;

    return userToUpdate;
  }

  static getUsers(query: GetUserQuery) {
    const { q, page, size } = query;

    const data = this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .limit(size!)
      .offset((page! - 1) * size!);

    if (q) {
      data.whereLike("name", `%${q}%`);
    }

    return data;
  }

  static count() {
    const count = this.queryBuilder().count("*").table("users").first();
    return count;
  }

  static async getUserById(id: string) {
    const query = this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .where({ id: id });
    const data = query;
    return data;
  }

  static async getUserByEmail(email: string) {
    const query = this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .where({ email: email });
    const data = await query;
    return data;
  }
}

const loggerArea = "model";
const logger = loggerWithNameSpace("User Model");

export let users: IUser[] = [
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

export function getUserByEmail(email: string) {
  logger.info(`${loggerArea}: get users by email`);
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function createUser(
  body: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  logger.info(`${loggerArea}: create users`);
  users.push({ ...body, id: `${users.length + 1}` });
  return { ...body, id: `${users.length + 1}` };
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
