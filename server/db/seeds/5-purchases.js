exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('purchases')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases').insert([
        {
          id: 1,
          user_id: 'auth0|abc12345',
          product_id: 9,
          quantity: 1,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 2,
          user_id: 'auth0|abc12345',
          product_id: 10,
          quantity: 6,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
        {
          id: 3,
          user_id: 'auth0|abc12345',
          product_id: 14,
          quantity: 5,
          purchased_at: '2023-02-10 10:30:00',
          shipping_id: 1,
          order_id: 1,
        },
      ])
    })
}
