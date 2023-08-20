exports.seed = async function (knex) {
await knex('wishlist').insert([
  { id: 1, user_id: 'auth0|abc12345', product_id: 1},
  { id: 2, user_id: 'auth0|abc12345', product_id: 2},
  { id: 3, user_id: 'auth0|abc12345', product_id: 3},
  { id: 4, user_id: 'auth0|abc12345', product_id: 4},
  { id: 5, user_id: 'auth0|abc12345', product_id: 5},
  { id: 6, user_id: 'auth0|abc12345', product_id: 6},
  { id: 7, user_id: 'auth0|abc12345', product_id: 7},
  { id: 8, user_id: 'auth0|abc12345', product_id: 8},
  { id: 9, user_id: 'auth0|abc12345', product_id: 9},
  { id: 10, user_id: 'auth0|abc12345', product_id: 10},
])
}