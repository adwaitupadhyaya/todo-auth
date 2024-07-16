import { ITodo } from "./../interface/todo";

import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const loggerArea = "model";
const logger = loggerWithNameSpace("Todo Model");

export class TodoModel extends BaseModel {
  // READ TODOS
  static async getTodos(userId: string) {
    const query = this.queryBuilder()
      .select("todos.todo", "todos.isCompleted", "todos.dueDate", "users.name")
      .table("todos")
      .innerJoin("users", "users.id", "todos.created_by")
      .where("todos.created_by", userId);
    const data = await query;
    return data;
  }

  static async getTodoById(id: string, userId: string) {
    const query = this.queryBuilder()
      .select(
        "users.name as owner",
        "todos.todo",
        "todos.dueDate",
        "todos.isCompleted"
      )
      .from("users")
      .innerJoin("todos", "users.id", "todos.created_by")
      .where("todos.created_by", userId)
      .where("todos.id", id)
      .first();
    const data = await query;
    return data;
  }

  // CREATE TODOS
  static async createTodo(todo: ITodo, id: string) {
    const newTodo = {
      todo: todo.todo,
      dueDate: todo.dueDate,
      isCompleted: todo.isCompleted,
      created_by: id,
    };

    const query = await this.queryBuilder().insert(newTodo).table("todos");
    return newTodo;
  }

  // UPDATE TODOS
  static async updateTodo(id: string, todo: ITodo, userId: string) {
    const todoToUpdate = {
      todo: todo.todo,
      isCompleted: todo.isCompleted,
      dueDate: todo.dueDate,
      created_by: userId,
    };
    const query = await this.queryBuilder()
      .update(todoToUpdate)
      .table("todos")
      .where({ id });
    return todoToUpdate;
  }

  // DELETE TODOS
  static async deleteTodo(id: string) {
    await this.queryBuilder().table("todos").where({ id }).del();
  }
}
