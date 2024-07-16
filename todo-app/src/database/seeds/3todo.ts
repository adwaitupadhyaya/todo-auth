import { Knex } from "knex";

const TABLE_NAME = "todos";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          todo: "Eat",
          isCompleted: true,
          dueDate: "2024-04-04",
          created_by: 3,
        },
        {
          todo: "Drink",
          isCompleted: true,
          dueDate: "2024-04-14",
          created_by: 2,
        },
        {
          todo: "Sleep",
          isCompleted: true,
          dueDate: "2024-04-14",
          created_by: 1,
        },
      ]);
    });
}
