import {
  NewReview,
  ProductReviews,
  Review,
  Reviews,
} from '../../models/Reviews'
import db from './connection'

/*
GET: getReviewsByProductId(productId : number)

GET: getAmountOfReviewsByDate(date : format?, adminUserId)

GET: getAllReviews(adminUserId)

GET: getReviewById(id : number, adminUserId : string)

POST: addReviewByUserId(userId : string, review : object)

PATCH: updateReviewStatusById(id : number, isEnabled : boolean, adminUserId : string)

DELETE: removeReviewByUserId(userId : string, productId : number)
*/

export async function getReviewsByProductId(productId: number) {
  return (await db('reviews')
    .join('users', 'reviews.user_id', 'users.auth0_id')
    .where('reviews.product_id', productId)
    .select(
      'reviews.product_id as productId',
      'reviews.description',
      'reviews.rating',
      'reviews.created_at as createdAt',
      'users.user_name as userName',
    )) as ProductReviews
}

export async function getAmountOfReviewsByDate(
  date: string,
  adminUserId: string,
) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  return await db('reviews')
    .count('* as reviewCount')
    .whereRaw('DATE(created_at) = ?', date)
    //DATE will ignore hours/minutes/seconds. It will only look at the year/month/day
    .first()
}

export async function getAllReviews(adminUserId: string) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  return (await db('reviews')
    .join('users', 'reviews.user_id', 'users.auth0_id')
    .join('products', 'reviews.product_id', 'products.id')
    .select(
      'reviews.id as id',
      'reviews.rating',
      'products.product_name as productName',
      'reviews.is_enabled as isEnabled',
      'users.user_name as userName',
      'reviews.created_at as createdAt',
    )) as Reviews
}

export async function getReviewById(id: number, adminUserId: string) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  return (await db('reviews')
    .join('users', 'reviews.user_id', 'users.auth0_id')
    .join('products', 'reviews.product_id', 'products.id')
    .select(
      'reviews.id as reviewId',
      'products.product_name as productName',
      'products.img as productImg',
      'reviews.description as reviewDescription',
      'reviews.rating as reviewRating',
      'reviews.is_enabled as reviewIsEnabled',
      'users.user_name as reviewerUserName',
      'reviews.created_at as reviewCreatedAt',
    )
    .first()) as Review
}

export async function recalculateAverageRatingByProductId(productId: number) {
  // Calculate the average rating
  const averageRatingResult = await db('reviews')
    .where('product_id', productId)
    .avg('rating as averageRating')
    .first()

  // Check if averageRatingResult is defined
  if (averageRatingResult && averageRatingResult.averageRating !== null) {
    const averageRating = averageRatingResult.averageRating
    //Round the rating to the nearest 0.25 incremement between 0 and 5. E.g. 0, 0.25, 0.5, 0.75, 1...
    const roundedAverage = Math.min(
      5,
      Math.max(0, Math.round(averageRating * 4) / 4),
    )

    // Update the associated product's average_rating
    await db('products')
      .where('id', productId)
      .update('average_rating', roundedAverage)

    // Return the updated average rating
    return roundedAverage
  } else {
    return null
  }
}

export async function addReviewByUserId(userId: string, newReview: NewReview) {
  await db('reviews').insert({ user_id: userId, ...newReview })

  //After we add the review, we recalcaute the average_rating of the associated product, taking into account the new review's rating that was just added.
  await recalculateAverageRatingByProductId(newReview.productId)

  /*
  NOTE: We don't need to add 'created_at' or 'is_enabled' because they both have defaults created when we add the data to the table.
  is_enabled defaults to true in migration file
  created_at defaults to knex.fn.now() in migration file
  */
}
