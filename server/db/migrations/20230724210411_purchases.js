exports.up = function (knex) {
  return knex.schema.createTable('purchases', function (table) {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table
      .integer('product_id')
      .references('products.id')
      .unsigned()
      .notNullable()
    table.integer('quantity').unsigned().notNullable()
    table.timestamp('purchased_at').notNullable().defaultTo(knex.fn.now())
    table
      .integer('shipping_id')
      .references('shipping_options.id')
      .unsigned()
      .notNullable()
    table.integer('order_id').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('purchases')
}
