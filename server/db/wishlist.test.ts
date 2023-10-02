import {
  beforeEach,
  beforeAll,
  afterAll,
  describe,
  it,
  expect
} from 'vitest'
import * as db from './wishlist'
import knex from 'knex'
import config from './knexfile'
import { error } from 'console'
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

describe('getWishlistByUserId', () => {
  it('get the accurate wishlist of the user', async () => {
    const testUserId = 'auth0|abc12345'
    const wishlist = await db.getWishlistByUserId(testUserId, testDb)
    expect(wishlist.length).toBe(10)
  })

  it('get nothing if the user does not exist', async () => {
    const testUserId = 'auth0|abc12346'
    const wishlist = await db.getWishlistByUserId(testUserId, testDb)
    expect(wishlist.length).toBeNull
  })

  it('wishlist product has the correct properties', async () => {
    const testUserId = 'auth0|abc12345'
    const wishlist = await db.getWishlistByUserId(testUserId, testDb)
    expect(wishlist[0]).toHaveProperty('id')
    expect(wishlist[0]).toHaveProperty('productId')
    expect(wishlist[0]).toHaveProperty('productImage')
    expect(wishlist[0]).toHaveProperty('productPrice')
  })
})

describe('getWishlistStatusByProductId', () => {
  it('return truthy if the product is in wishlist', async () => {
    const testProductId = 1
    const testUserId = 'auth0|abc12345'
    const result = await db.getWishlistStatusByProductId(testProductId, testUserId, testDb)
    expect(result).toBeTruthy
  })

  it('return falsy if the product is not in wishlist', async () => {
    const testProductId = 12
    const testUserId = 'auth0|abc12345'
    const result = await db.getWishlistStatusByProductId(testProductId, testUserId, testDb)
    expect(result).toBeFalsy
  })
})

describe('addToWishlistByProductId', () => {
  it('product added to wishlist successfully', async () => {
    const testProductId = 12
    const testUserId = 'auth0|abc12345'
    await db.addToWishlistByProductId(testProductId, testUserId, testDb)

    const result = await db.getWishlistStatusByProductId(testProductId, testUserId, testDb)
    expect(result).toBeTruthy
  })

  it('return error message with exsiting wishlist product', async () => {
    const testProductId = 1
    const testUserId = 'auth0|abc12345'
    // Use a try-catch block to catch the error thrown by addToWishlistByProductId
    try {
      await db.addToWishlistByProductId(testProductId, testUserId, testDb)
      // If the above line doesn't throw an error, fail the test
      fail('expected an error to be thrown')
    } catch (error) {
      // Check if the error message matches the expected message
      expect(error.message).toBe('Item already in wishlist')
    }

  })
})