exports.seed = async function (knex) {
  await knex('shipping_options').insert([
    {
      id: 1,
      shipping_type: 'Standard (3-7 working days)',
      price: 5,
    },
    {
      id: 2,
      shipping_type: 'Express (2-4 working days)',
      price: 12.5,
    },
    {
      id: 3,
      shipping_type: 'Overnight (1 working day)',
      price: 25,
    },
  ])
}
