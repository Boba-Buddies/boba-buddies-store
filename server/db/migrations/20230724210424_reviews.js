exports.up = function(knex) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments('id').primary();
    table.integer('product_id').references('products.id').unsigned().notNullable();
    table.text('description').notNullable();
    table.decimal('rating').notNullable();
    table.boolean('is_enabled').notNullable().defaultTo(true);
    table.string('user_id').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reviews');
};
