const fs = require('fs')
const csv = require('csv-parser')

const csvData = []

fs.createReadStream('purchases.csv') // replace with your csv file
  .pipe(csv())
  .on('data', (row) => {
    csvData.push(row)
  })
  .on('end', () => {
    let seedData = "return knex('table_name').insert(["
    csvData.forEach((row, index) => {
      seedData += `\n    {id: ${row.id}, user_id: '${
        row.user_id
      }', product_id: ${row.product_id}, quantity: ${
        row.quantity
      }, purchased_at: '${row.purchased_at}', shipping_id: ${
        row.shipping_id
      }, order_id: ${row.order_id}}${index < csvData.length - 1 ? ',' : ''}`
    })
    seedData += '\n]);\n'
    console.log(seedData)
  })
//to run use 'node csv-knex-seed-parse.js'
