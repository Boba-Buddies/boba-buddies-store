exports.up = function (knex) {
  return knex.schema.createTable('cart', function (table) {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table
      .integer('product_id')
      .references('products.id')
      .unsigned()
      .notNullable()
    table.integer('shipping_id').references('shipping_options.id').unsigned()
    table.integer('quantity').unsigned().defaultTo(1)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cart')
}
