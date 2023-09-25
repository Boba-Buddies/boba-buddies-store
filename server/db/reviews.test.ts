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
//toHaveProperty
//getReviewsByProductId
describe('getReviewsByProductId', () => {
  it('returns reviews that match given product id', async () => {
    const testProductId = 1
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    expect(reviews[0].productId).toBe(testProductId)
    expect(reviews[0]).toHaveProperty('productId')
    expect(reviews[0]).toHaveProperty('userName')
    expect(reviews[0]).toHaveProperty('rating')
    expect(reviews[0]).toHaveProperty('createdAt')
    expect(reviews[0]).toHaveProperty('description')
  })

  it('returns all reviews that match given product id', async () => {
    const testProductId = 1
    //In the test seed data, there are 2 reviews for product 1
    const expectedAmountOfReviews = 2
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    expect(reviews.length).toBe(expectedAmountOfReviews)
  })
})

//getAmountOfReviewsByDate
describe('getAmountOfReviewsByDate', () => {
  it('returns the correct amount of reviews associated with given date', async () => {
    const testDate = '2023-07-15'
    //In the test seed data, there are 4 reviews for the date "2023-07-15"
    const expectedAmountOfReviews = 4
    const reviews = await db.getAmountOfReviewsByDate(testDate, testDb)
    expect(reviews.reviewCount).toBe(expectedAmountOfReviews)
    expect(reviews).toHaveProperty('reviewCount')
  })
})

//getAllReviews
describe('getAllReviews', () => {
  it('returns the all of the reviews', async () => {
    //In the test seed data, there is a total of 41 reviews
    const expectAmountOfReviews = 41
    const reviews = await db.getAllReviews(testDb)
    expect(reviews.length).toBe(expectAmountOfReviews)
    expect(reviews[0]).toHaveProperty('isEnabled')
    expect(reviews[0]).toHaveProperty('userName')
    expect(reviews[0]).toHaveProperty('rating')
    expect(reviews[0]).toHaveProperty('createdAt')
    expect(reviews[0]).toHaveProperty('id')
    expect(reviews[0]).toHaveProperty('productName')
  })
})

//getReviewById
describe('getReviewById', () => {
  it('returns review that matches given id', async () => {
    const testId = 1
    const review = await db.getReviewById(testId, testDb)
    expect(review.reviewId).toBe(testId)
    expect(review).toHaveProperty('reviewIsEnabled')
    expect(review).toHaveProperty('reviewId')
    expect(review).toHaveProperty('productName')
    expect(review).toHaveProperty('productImage')
    expect(review).toHaveProperty('reviewDescription')
    expect(review).toHaveProperty('reviewRating')
    expect(review).toHaveProperty('reviewerUserName')
    expect(review).toHaveProperty('reviewCreatedAt')
  })
})

//!recalculateAverageRatingByProductId
