import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as todoService from "../service/todo";
import HttpStatusCodes from "http-status-codes";
import { NotFoundError } from "../error/NotFoundError";

/**
 * The function `getTodos` retrieves todos data and sends it as a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getTodos` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set headers, and
 * control the response status.
 */
export async function getTodos(req: Request, res: Response) {
  const id = req.user?.id!;
  const data = await todoService.getTodos(id);
  res.status(HttpStatusCodes.OK).json(data);
}

/**
 * The function `getTodoById` retrieves a todo item by its ID from a service and sends the data as a
 * JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getTodoById` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this case, the response is being sent as JSON data using the `res.json()` method.
 */
export async function getTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id!;
  const { id } = req.params;
  const data = await todoService.getTodoById(id, userId);

  if (!data) {
    next(new NotFoundError(`Todo with id: ${id} doesnt exist`));
    return;
  }
  res.status(HttpStatusCodes.OK).json(data);
}

/**
 * The function `createTodo` creates a new todo item based on the request body and sends a JSON
 * response with a success message and the created data.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `createTodo` function is an instance of the
 * `Response` object in Express.js. It is used to send a response back to the client making the
 * request. In this case, the response is being sent as JSON with a message indicating that a todo has
 * been
 */
export async function createTodo(req: Request, res: Response) {
  const id = req.user?.id!;
  const { body } = req;
  const data = await todoService.createTodo(body, id);
  res.status(HttpStatusCodes.CREATED).json({
    message: "Todo Created",
    created: data,
  });
}

/**
 * The function `updateTodo` receives a request and response, extracts the body and id from the
 * request, updates a todo item using a service, and sends the updated data as a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `updateTodo` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this case, the response is being sent as JSON data using the `res.json()` method.
 */
export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id!;
  const { body } = req;
  const { id } = req.params;
  const data = await todoService.updateTodo(id, body, userId);
  if (!data) {
    next(new NotFoundError(`Todo with ${id} does not exist`));
    return;
  }
  res.status(HttpStatusCodes.OK).json({ updatedData: data });
}

/**
 * The function `deleteTodo` takes a request and response object, deletes a todo item based on the
 * provided ID, and returns a success message or an error message.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `deleteTodo` function is an instance of the
 * @returns If there is an error during the deletion process, the error message will be returned as a
 * JSON response. Otherwise, if the deletion is successful, a JSON response with the message
 * "Successfully deleted" will be returned.
 */
export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id!;
  const { id } = req.params;
  const data = await todoService.deleteTodo(id, userId);

  if (data === null) {
    next(new NotFoundError(`Todo with id ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).json({ message: "Todo Deleted Succesfully" });
}
