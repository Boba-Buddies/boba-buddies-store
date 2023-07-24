/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('wishlist').del()
  await knex('reviews').del()
  await knex('purchases').del()
  await knex('cart').del()
  await knex('emails').del()
  await knex('users').del()
  await knex('shipping_options').del()
  await knex('products').del()
};
