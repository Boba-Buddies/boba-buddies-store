import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import knex from 'knex'

import * as db from './reviews'
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

//getReviewsByProductId

describe('getReviewsByProductId', () => {
  it('returns reviews that match product Id', async () => {
    const testProductId = 1
    const reviews = await db.getReviewsByProductId(testProductId, testDb)

    expect(reviews[0].productId).toBe(testProductId)
  })
})


