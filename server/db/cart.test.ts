import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import knex from 'knex'

import * as db from './cart'
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

describe('getCartByUserId', () => {
  it('it should return cart by userId', async () => {
    const cart = await db.getCartByUserId('auth0|xyz45678', testDb)

    expect(cart[0]).toHaveProperty('userId')
    expect(cart[0]).toHaveProperty('productId')
    expect(cart[0]).toHaveProperty('quantity')
  })
})
