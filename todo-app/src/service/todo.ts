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
export function getTodos(id: string) {
  logger.info(`${loggerArea}: get todos`);
  return TodoModel.getTodos(id);
}

/**
 * Retrieves a todo by its ID.
 * @param {string} id - The ID of the todo.
 * @returns {Object} The todo item or an error object if not found.
 */
export function getTodoById(id: string, userId: string) {
  logger.info(`${loggerArea}: get todos by id`);
  const data = TodoModel.getTodoById(id, userId);

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
export function createTodo(body: ITodo, id: string) {
  logger.info(`${loggerArea}: create todos `);
  return TodoModel.createTodo(body, id);
}

/**
 * Updates an existing todo.
 * @param {string} id - The ID of the todo to update.
 * @param {ITodo} body - The updated todo data.
 * @returns {Object} The updated todo item or an error object if validation fails.
 */
export function updateTodo(id: string, body: ITodo, userId: string) {
  logger.info(`${loggerArea}: update todos`);
  const todoToUpdate = TodoModel.getTodoById(id, userId);
  if (!todoToUpdate) {
    return todoToUpdate;
  }
  return TodoModel.updateTodo(id, body);
}

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to delete.
 * @returns {void|Object} Void or an error object if not found.
 */
export function deleteTodo(id: string, userId: string) {
  logger.info(`${loggerArea}: delete todos`);
  const todoToDelete = TodoModel.getTodoById(id, userId);

  if (!todoToDelete) {
    return todoToDelete;
  }
  return TodoModel.deleteTodo(id, userId);
}
