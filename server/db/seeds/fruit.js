exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('fruit')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('fruit').insert([
        { id: 1, name: 'banana' },
        { id: 2, name: 'apple' },
        { id: 3, name: 'feijoa' },
      ])
    })
}
