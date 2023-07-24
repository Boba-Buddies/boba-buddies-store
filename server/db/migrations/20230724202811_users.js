/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('auth0_id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('user_name').notNullable()
    table.string('phone_number').notNullable()
    table.string('address').notNullable()
    table.string('city').notNullable()
    table.string('country').notNullable()
    table.string('zip_code').notNullable()
    table.string('email_address').notNullable()
    table.timestamp('created_at').notNullable()
    table.boolean('is_admin').defaultTo(false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
