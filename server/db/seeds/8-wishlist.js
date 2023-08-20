exports.seed = async function (knex) {
await knex('cart').insert([
  { id: 1, user_id: 'auth0|abc12345', product_id: 1},
  { id: 1, user_id: 'auth0|abc12345', product_id: 2},
  { id: 1, user_id: 'auth0|abc12345', product_id: 3},
  { id: 1, user_id: 'auth0|abc12345', product_id: 4},
  { id: 1, user_id: 'auth0|abc12345', product_id: 5},
  { id: 1, user_id: 'auth0|abc12345', product_id: 6},
  { id: 1, user_id: 'auth0|abc12345', product_id: 7},
  { id: 1, user_id: 'auth0|abc12345', product_id: 8},
  { id: 1, user_id: 'auth0|abc12345', product_id: 9},
  { id: 1, user_id: 'auth0|abc12345', product_id: 10},
])
}