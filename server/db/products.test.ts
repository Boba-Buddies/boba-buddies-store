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
    const AdminProduct = await db.getAllProductsAdmin(testDb)
    expect(AdminProduct[0].isEnabled).toBe(isEnable)
  })
})

describe('getAllProductsUser', () => {
  it('returns all the products for user page', async () => {
    const testProductName = 'Pearl Milk Tea'
    const AdminProduct = await db.getAllProductsAdmin(testDb)
    expect(AdminProduct[0].name).toBe(testProductName)
  })
})
