import Joi from "joi";
import JoiDate from "@joi/date";

const JoiExtended = Joi.extend(JoiDate);
export const createTodoSchema = Joi.object({
  todo: Joi.string().required().messages({
    "any.required": "Email is required",
  }),
  isCompleted: Joi.boolean().required().messages({
    "any.required": "Complete status is required",
  }),
  dueDate: JoiExtended.date().format("YYYY-MM-DD").utc().required().messages({
    "any.required": "Due date is required",
    "date.format": "Date should be in YYYY-MM-DD format",
  }),
});
