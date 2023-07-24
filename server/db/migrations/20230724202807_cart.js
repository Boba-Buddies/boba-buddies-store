/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cart', function (table) {
    table.increments('id').primary()
    table.string('user_id').notNullable()
    table.integer('product_id').unsigned().notNullable()
    table.integer('shipping_id').unsigned()
    table.integer('quantity').unsigned().defaultTo(1)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cart')
}
