import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    await trx("permissions").del();
    await trx("todos").del();
    await trx(TABLE_NAME).del();

    await trx(TABLE_NAME).insert([
      {
        name: "superuser",
        email: "superuser@test.com",
        password: "superuser123",
      },
      {
        name: "adw8",
        email: "adw8@gmail.com",
        password:
          "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
      },
      {
        name: "manish",
        email: "manish@gmail.com",
        password: "Manish123!",
      },
    ]);
  });
}
