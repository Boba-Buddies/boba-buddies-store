import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import knex from 'knex'
import * as db from './products'
import config from './knexfile'
const testDb = knex(config.test)

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getAllProductsAdmin', () => {
  it('returns all the products for admin page', async () => {
    const testProductName = 'Pearl Milk Tea'
    const AdminProduct = await db.getAllProductsAdmin(testDb)
    expect(AdminProduct[0].name).toBe(testProductName)
  })

  it('returns all the products which contian isEnable is true or false', async () => {
    const isEnable = 1
    const adminProduct = await db.getAllProductsAdmin(testDb)
    expect(adminProduct[0].isEnabled).toBe(isEnable)
  })
})

describe('getAllProductsUser', () => {
  it('returns all the products for user page', async () => {
    const testProductName = 'Pearl Milk Tea'
    const adminProduct = await db.getAllProductsAdmin(testDb)
    expect(adminProduct[0].name).toBe(testProductName)
  })
})

describe('getProductByIdAdmin', () => {
  it('returns the products by productId for admin page', async () => {
    const testProductId = 5
    const testProductName = 'Brown Sugar Milk Tea and Pearls'
    const adminProduct = await db.getProductByIdAdmin(testProductId, testDb)
    expect(adminProduct.name).toBe(testProductName)
  })

  it('returns an empty object if there is no matched productId', async () => {
    const testProductId = 1123
    const adminProduct = await db.getProductByIdAdmin(testProductId, testDb)
    expect(adminProduct).toBeUndefined()
  })
})

describe('getProductByIdUser', () => {
  it('returns the products by productId for user page', async () => {
    const testProductId = 2
    const testProductName = 'Original Milk Tea'
    const userProduct = await db.getProductByIdUser(testProductId, testDb)
    expect(userProduct.name).toBe(testProductName)
  })

  it('returns an empty object if there is no matched productId', async () => {
    const testProductId = 1123
    const userProduct = await db.getProductByIdAdmin(testProductId, testDb)
    expect(userProduct).toBeUndefined()
  })
})

describe('getAmountOfProductsBelowStockLevel', () => {
  it('returns the products which below the max stock level', async () => {
    const testMaxStock = 5
    const sampleLowStockProduct = await testDb('products')
      .where('stock', '<', testMaxStock)
      .first()

    const products = await db.getAmountOfProductsBelowStockLevel(
      testMaxStock,
      testDb,
    )
    const foundProduct = products.find(
      (product) => product.id === sampleLowStockProduct.id,
    )
    expect(foundProduct).toBeDefined()
    expect(foundProduct?.name).toBe(sampleLowStockProduct.name)
  })
})
