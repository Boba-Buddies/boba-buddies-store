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

