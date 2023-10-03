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
  })

  it('returns all reviews that match given product id', async () => {
    const testProductId = 1
    //In the test seed data, there are 2 reviews for product 1
    const expectedAmountOfReviews = 2
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    expect(reviews.length).toBe(expectedAmountOfReviews)
  })

  it('reviews has the correct properties', async () => {
    const testProductId = 1
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    expect(reviews[0]).toHaveProperty('productId')
    expect(reviews[0]).toHaveProperty('userName')
    expect(reviews[0]).toHaveProperty('rating')
    expect(reviews[0]).toHaveProperty('createdAt')
    expect(reviews[0]).toHaveProperty('description')
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
  })

  it('reviews has the correct properties', async () => {
    const testDate = '2023-07-15'
    const reviews = await db.getAmountOfReviewsByDate(testDate, testDb)
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
  })
  it('reviews has the correct properties', async () => {
    const reviews = await db.getAllReviews(testDb)
    expect(reviews[0]).toHaveProperty('isEnabled')
    expect(reviews[0]).toHaveProperty('userName')
    expect(reviews[0]).toHaveProperty('rating')
    expect(reviews[0]).toHaveProperty('createdAt')
    expect(reviews[0]).toHaveProperty('id')
    expect(reviews[0]).toHaveProperty('productName')
  })
})

//getReviewById
describe('getReviewById', async () => {
  it('returns review that matches given id', async () => {
    const testId = 1
    const review = await db.getReviewById(testId, testDb)
    expect(review.reviewId).toBe(testId)
  })

  it('review has the correct properties', async () => {
    const testId = 1
    const review = await db.getReviewById(testId, testDb)
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

//getReviewsByUserId
describe('getReviewsByUserId', () => {
  it('returns reviews that match given username associated with userId (auth0)', async () => {
    const testUserId = 'auth0|abc12345'
    //In the test seed, auth0|abc12345 is associated with the username 'emma.j'
    const expectUserName = 'emma.j'
    const reviews = await db.getReviewsByUserId(testUserId, testDb)
    expect(reviews[0].reviewerUserName).toBe(expectUserName)
  })

  it('returns correct amount of reviews associated with given userId', async () => {
    const testUserId = 'auth0|abc12345'
    //In the test seed data, there are 5 reviews made by auth0|abc12345
    const expectedAmountOfReviews = 5
    const reviews = await db.getReviewsByUserId(testUserId, testDb)
    expect(reviews.length).toBe(expectedAmountOfReviews)
  })

  it('reviews have the correct properties', async () => {
    const testUserId = 'auth0|abc12345'
    const reviews = await db.getReviewsByUserId(testUserId, testDb)
    expect(reviews[0]).toHaveProperty('productName')
    expect(reviews[0]).toHaveProperty('productImage')
    expect(reviews[0]).toHaveProperty('reviewDescription')
    expect(reviews[0]).toHaveProperty('reviewRating')
    expect(reviews[0]).toHaveProperty('reviewerUserName')
    expect(reviews[0]).toHaveProperty('reviewCreatedAt')
    expect(reviews[0]).toHaveProperty('productId')
  })
})

describe('addReviewByUserId & removeReviewByProductId', async () => {
  //The testUserId and testProductId will be the same for the adding review and removing review tests.
  const testUserId = 'auth0|abc12345'
  const testProductId = 2
  const testNewReview = {
    productId: testProductId,
    rating: 5,
    description: 'This drink is spectacular!',
  }

  //In the test seed data, the associated userName with the userId of 'auth0|abc12345', is 'emma.j'
  const testUserName = 'emma.j'

  it('review is added/removed successfully', async () => {
    //Add the test review
    await db.addReviewByUserId(testNewReview, testUserId, testDb)

    //Get all reviews
    const reviews = await db.getReviewsByProductId(testProductId, testDb)
    const latestReviewIndex = reviews.length - 1

    //Check if the newest review for the matching product is the same as the added one.
    expect(reviews[latestReviewIndex]).toContain({
      ...testNewReview,
      userName: testUserName,
    })
    expect(reviews[latestReviewIndex]).toHaveProperty('productId')
    expect(reviews[latestReviewIndex]).toHaveProperty('userName')
    expect(reviews[latestReviewIndex]).toHaveProperty('rating')
    expect(reviews[latestReviewIndex]).toHaveProperty('createdAt')
    expect(reviews[latestReviewIndex]).toHaveProperty('description')

    //remove the review we added before by matching the testUserId and testProductId
    await db.removeReviewByProductId(testProductId, testUserId, testDb)

    //Get all reviews
    const refetchedReviews = await db.getReviewsByProductId(
      testProductId,
      testDb,
    )
    const refetchedLatestReviewIndex = refetchedReviews.length - 1

    //Check that latest review for matching product is NOT the same as the added one before.
    expect(refetchedReviews[refetchedLatestReviewIndex]).not.toContain({
      ...testNewReview,
      userName: testUserName,
    })
  })
})

describe('updateReviewStatusById', async () => {
  it('Status of true updates correctly', async () => {
    //In the test seed, the review associated with id of 1 is set to true.
    const testReviewId = 1
    const updatedReviewStatus = { id: testReviewId, isEnabled: false }
    await db.updateReviewStatusById(updatedReviewStatus, testDb)
    const testReview = db.getReviewById(testReviewId, testDb)
    expect((await testReview).reviewIsEnabled).toBe(false)
  })
})

describe('recalculateAverageRatingByProductId', async () => {
  //Average rating of product id of 1 in the test seed is 3.75, based on two reviews, one with a rating of 5, and the other with a rating of 2.5

  const testProductId = 1
  
  it('Average rating recalculates correctly after adding a review', async () => {
    //when adding a review with a rating of 3, the new averageRating should be 3.5 because (5+2.5+3)/3 = 3.5
    const expectedNewAverageRating = 3.5
    const testReview = {
      productId: testProductId,
      rating: 3,
      description: 'this product is average',
    }
    const testUserId = 'auth0|xyz45678'
    await db.addReviewByUserId(testReview, testUserId, testDb)
    //The recalculateAverageRatingByProductId will run within addReviewByUserId. We are running it again because it returns the new rounded average.
    const testNewAverageRating = await db.recalculateAverageRatingByProductId(
      testReview.productId, testDb
    )
    expect(testNewAverageRating).toBe(expectedNewAverageRating)
  })

  /*
  it ('Averate rating recalculates correctly after removing a review') {

  }

  it('Average rating recalcuates correctly after changing status of a review to false') {

  }
*/
})

//!recalculateAverageRatingByProductId
