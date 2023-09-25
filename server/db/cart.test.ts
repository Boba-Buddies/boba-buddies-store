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

// Tests if it returns cart by userId
describe('getCartByUserId', () => {
  it('should return cart by userId', async () => {
    const cart = await db.getCartByUserId('auth0|rigelle-test', testDb)

    expect(cart[0]).toHaveProperty('userId')
    expect(cart[0]).toHaveProperty('productId')
    expect(cart[0]).toHaveProperty('quantity')
  })
})

// Tests if it adds product to cart by userId

describe('checkIsUserInCart', () => {
  it('should return true if the user is in the cart', async () => {
    const userId = 'auth0|rigelle-test'
    const result = await db.checkIsUserInCart(userId, testDb)
    expect(result).toBe(true)
  })
})
