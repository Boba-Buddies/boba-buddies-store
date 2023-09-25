import {
  beforeEach,
  beforeAll,
  afterAll,
  describe,
  it,
  expect,
  vi,
} from 'vitest'
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

//getReviewsByProductId - FLAKY!
describe('getReviewsByProductId', () => {
  it('returns reviews that match given product id', async () => {
    const testProductId = 1
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    expect(reviews[0].productId).toBe(testProductId)
  })

  it ('returns all reviews that match given product id', async () => {
    const testProductId = 1
    //In the test seed data, there are 2 reviews for product 1
    const expectedAmountOfReviews = 2
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    expect(reviews.length).toBe(expectedAmountOfReviews)
  })

})

//!getAmountOfReviewsByDate

//!getAllReviews

//getReviewById
describe('getReviewById', () => {
  it('returns review that matches given id', async () => {
    const testId = 1
    const review = await db.getReviewById(testId, testDb)
    expect(review.reviewId).toBe(testId)
  })
})

//!recalculateAverageRatingByProductId
