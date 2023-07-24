exports.up = function (knex) {
  return knex.schema.createTable('emails', function (table) {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.boolean('is_read').defaultTo(false)
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('emails')
}
