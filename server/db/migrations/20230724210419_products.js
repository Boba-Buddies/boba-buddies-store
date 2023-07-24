exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('img').notNullable()
    table.decimal('price').notNullable()
    table.text('description').notNullable()
    table.integer('stock').unsigned().notNullable()
    table.boolean('is_enabled').notNullable().defaultTo(true)
    table.decimal('average_rating').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products')
}
