exports.up = function (knex) {
  return knex.schema.createTable('shipping_options', function (table) {
    table.increments('id').primary()
    table.string('shipping_type').notNullable()
    table.decimal('price').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('shipping_options')
}
