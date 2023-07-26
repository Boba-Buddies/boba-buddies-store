exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('auth0_id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('user_name').notNullable()
    table.string('phone_number').notNullable().defaultTo('')
    table.string('address').notNullable().defaultTo('')
    table.string('city').notNullable().defaultTo('')
    table.string('country').notNullable().defaultTo('')
    table.string('zip_code').notNullable().defaultTo('')
    table.string('email_address').notNullable().defaultTo('')
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo()
      .defaultTo(knex.fn.now())
    table.boolean('is_admin').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
