exports.seed = async function (knex) {
  await knex('cart').insert([
    { id: 1, user_id: 'auth0|rigelle-test', product_id: 2, quantity: 2 },
    { id: 2, user_id: 'auth0|rigelle-test', product_id: 5, quantity: 3 },
    { id: 3, user_id: 'auth0|rigelle-test', product_id: 6, quantity: 1 },
    { id: 4, user_id: 'auth0|rigelle-test', product_id: 9, quantity: 2 },
    { id: 5, user_id: 'auth0|rigelle-test', product_id: 11, quantity: 5 },
    { id: 6, user_id: 'auth0|lemon-test', product_id: 1, quantity: 2 },
    { id: 7, user_id: 'auth0|lemon-test', product_id: 4, quantity: 7 },
    { id: 8, user_id: 'auth0|lemon-test', product_id: 7, quantity: 3 },
    { id: 9, user_id: 'auth0|lemon-test', product_id: 10, quantity: 9 },
    { id: 10, user_id: 'auth0|lemon-test', product_id: 13, quantity: 2 },
  ])
}
