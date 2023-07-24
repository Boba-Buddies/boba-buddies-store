exports.up = function(knex) {
  return knex.schema.createTable('wishlist', function(table) {
    table.increments('id').primary();
    table.string('user_id').references('users.auth0_id').notNullable();
    table.integer('product_id').references('products.id').unsigned().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('wishlist');
};
