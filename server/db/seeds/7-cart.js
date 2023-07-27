exports.seed = function (knex) {
  // Deletes ALL existing entries in the cart table
  return knex('cart').del().then(function () {
    // Inserts seed entries
    return knex('cart').insert([
      {
        user_id: 'auth0|abc12345', 
        product_id: 1, 
        quantity: 3,
      },
      {
        user_id: 'auth0|abc12345', 
        product_id: 2, 
        quantity: 1,
      },
      {
        user_id: 'auth0|def67890', 
        product_id: 2, 
        quantity: 2,
      },
    ]);
  });
};
