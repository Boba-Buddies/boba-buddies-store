exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cart').del()

  // Inserts seed entries
  const cartItems = [
    { id: 1, user_id: 'auth0|xyz12345', product_id: 2, quantity: 2 },
    { id: 2, user_id: 'auth0|xyz12345', product_id: 5, quantity: 3 },
    { id: 3, user_id: 'auth0|xyz12345', product_id: 6, quantity: 1 },
    { id: 4, user_id: 'auth0|xyz12345', product_id: 9, quantity: 2 },
    { id: 5, user_id: 'auth0|xyz12345', product_id: 11, quantity: 5 },
    { id: 6, user_id: 'auth0|abc23456', product_id: 1, quantity: 2 },
    { id: 7, user_id: 'auth0|abc23456', product_id: 4, quantity: 7 },
    { id: 8, user_id: 'auth0|abc23456', product_id: 7, quantity: 3 },
    { id: 9, user_id: 'auth0|abc23456', product_id: 10, quantity: 9 },
    { id: 10, user_id: 'auth0|abc23456', product_id: 13, quantity: 2 },
    { id: 11, user_id: 'auth0|uvw54321', product_id: 3, quantity: 2 },
    { id: 12, user_id: 'auth0|uvw54321', product_id: 6, quantity: 1 },
    { id: 13, user_id: 'auth0|uvw54321', product_id: 8, quantity: 3 },
    { id: 14, user_id: 'auth0|uvw54321', product_id: 11, quantity: 2 },
    { id: 15, user_id: 'auth0|uvw54321', product_id: 14, quantity: 1 },
    { id: 16, user_id: 'auth0|def34567', product_id: 2, quantity: 2 },
    { id: 17, user_id: 'auth0|def34567', product_id: 5, quantity: 3 },
    { id: 18, user_id: 'auth0|def34567', product_id: 7, quantity: 2 },
    { id: 19, user_id: 'auth0|def34567', product_id: 10, quantity: 2 },
    { id: 20, user_id: 'auth0|wxy67890', product_id: 3, quantity: 7 },
    { id: 21, user_id: 'auth0|wxy67890', product_id: 6, quantity: 3 },
  ]

  await knex('cart').insert(cartItems)
}
