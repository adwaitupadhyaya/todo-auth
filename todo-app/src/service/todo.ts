import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todo";
import { extractUserId } from "../utils/userId";

import loggerWithNameSpace from "../utils/logger";

const loggerArea = "service";
const logger = loggerWithNameSpace("Todo Service");

/**
 * Retrieves all todos.
 * @returns {Array} Array of todo items.
 */
export async function getTodos(id: string) {
  logger.info(`${loggerArea}: get todos`);
  return await TodoModel.TodoModel.getTodos(id);
}

/**
 * Retrieves a todo by its ID.
 * @param {string} id - The ID of the todo.
 * @returns {Object} The todo item or an error object if not found.
 */
export async function getTodoById(id: string, userId: string) {
  logger.info(`${loggerArea}: get todos by id`);
  const data = await TodoModel.TodoModel.getTodoById(id, userId);

  if (!data) {
    return data;
  }

  return data;
}

/**
 * Creates a new todo.
 * @param {ITodo} body - The todo item to create.
 * @returns {Object} The created todo item.
 */
export async function createTodo(body: ITodo, id: string) {
  logger.info(`${loggerArea}: create todos `);
  return await TodoModel.TodoModel.createTodo(body, id);
}

export async function updateTodo(id: string, body: ITodo, userId: string) {
  logger.info(`${loggerArea}: update todos`);
  const todoToUpdate = await TodoModel.TodoModel.getTodoById(id, userId);
  if (!todoToUpdate) {
    return todoToUpdate;
  }
  return await TodoModel.TodoModel.updateTodo(id, body, userId);
}

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to delete.
 * @returns {void|Object} Void or an error object if not found.
 */
export async function deleteTodo(id: string, userId: string) {
  logger.info(`${loggerArea}: delete todos`);
  const todoToDelete = TodoModel.TodoModel.getTodoById(id, userId);
  console.log(todoToDelete);
  if (!todoToDelete) {
    return null;
  }
  return await TodoModel.TodoModel.deleteTodo(id);
}
