import { query } from "express";
import { GetUserQuery, IUser } from "../interface/user";

import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  // CREATE USER
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

  // READ USERS
  static getUsers(query: GetUserQuery) {
    const { q, page, size } = query;

    const data = this.queryBuilder()
      .select("users.id", "users.name", "users.email", "permissions.permission")
      .table("users")
      .leftJoin("permissions", "users.id", "permissions.user_id")
      .limit(size!)
      .offset((page! - 1) * size!);

    if (q) {
      data.whereLike("name", `%${q}%`);
    }

    return data;
  }

  // FOR PAGINATON
  static count() {
    const count = this.queryBuilder().count("*").table("users").first();
    return count;
  }

  // READ USERS
  static async getUserById(userId: string) {
    const query = this.queryBuilder()
      .select("users.id", "users.name", "users.email", "permissions.permission")
      .table("users")
      .leftJoin("permissions", "users.id", "permissions.user_id")
      .where({ "users.id": userId });
    const data = query;
    return data;
  }

  static async getUserByEmail(email: string) {
    const query = this.queryBuilder()
      .select("users.id", "users.email", "users.password")
      .table("users")
      .innerJoin("permissions", "users.id", "permissions.user_id")
      .where({ "users.email": email })
      .first();
    const data = await query;
    return data;
  }

  // UPDATE USER INFO
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

    await query;

    await this.queryBuilder()
      .update({
        user_id: id,
        permission: body.permissions,
      })
      .table("permissions")
      .where({ userId: id });

    return userToUpdate;
  }

  // DELETE USER

  static async delete(id: string) {
    await this.queryBuilder().table("permissions").where({ userId: id }).del();
    await this.queryBuilder().table("users").where({ id }).del();
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
    permissions: "superAdmin",
  },
  {
    name: "adw",
    email: "adw@gmail.com",
    password: "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
    id: "2",
    permissions: "",
  },
];
