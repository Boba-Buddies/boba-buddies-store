import {
  NewReview,
  ProductReviews,
  Review,
  Reviews,
  UpdatedReviewStatus,
} from '../../models/Reviews'
import db from './connection'

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
) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  return await db('reviews')
    .count('* as reviewCount')
    .whereRaw('DATE(created_at) = ?', date)
    //DATE will ignore hours/minutes/seconds. It will only look at the year/month/day
    .first()
}

export async function getAllReviews() {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  const reviews = (await db('reviews')
    .join('users', 'reviews.user_id', 'users.auth0_id')
    .join('products', 'reviews.product_id', 'products.id')
    .select(
      'reviews.id as id',
      'reviews.rating',
      'products.name as productName',
      'reviews.is_enabled as isEnabled',
      'users.user_name as userName',
      'reviews.created_at as createdAt',
    )) as Reviews

  // Here we map through each review and transform the isEnabled field from integer to boolean, since SQLite always represents true as 1, and false as 0 under the hood.
  return reviews.map((review) => ({
    ...review,
    isEnabled: Boolean(review.isEnabled),
  }))
}

export async function getReviewById(id: number) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  const review = (await db('reviews')
    .where('reviews.id', id)
    .join('users', 'reviews.user_id', 'users.auth0_id')
    .join('products', 'reviews.product_id', 'products.id')
    .select(
      'reviews.id as reviewId',
      'products.name as productName',
      'products.image as productImage',
      'reviews.description as reviewDescription',
      'reviews.rating as reviewRating',
      'reviews.is_enabled as reviewIsEnabled',
      'users.user_name as reviewerUserName',
      'reviews.created_at as reviewCreatedAt',
    )
    .first()) as Review

  //Convert is_enabled: 1/0 value into true/false
  return { ...review, reviewIsEnabled: Boolean(review.reviewIsEnabled) }
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

export async function addReviewByUserId(newReview: NewReview, userId : string) {
  await db('reviews').insert({
    user_id: userId,
    product_id: newReview.productId,
    description: newReview.description,
    rating: newReview.rating,
  })

  //After we add the review, we recalcaute the average_rating of the associated product, taking into account the new review's rating that was just added.
  await recalculateAverageRatingByProductId(newReview.productId)
}

export async function updateReviewStatusById(
  updatedReviewStatus: UpdatedReviewStatus,
) {
  const { id, isEnabled, adminUserId } = updatedReviewStatus
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  // Select the associated review with the given id
  const review = await db('reviews').where('id', id).first()

  // Check if the review exists
  if (!review) {
    return 'Review not found'
  }

  await db('reviews').where('id', id).update('is_enabled', isEnabled)

  return `is_enabled status of reivew matching the id: ${id} has been updated to ${isEnabled}`
}

export async function removeReviewByUserId(productId: number, userId: string) {
  await db('reviews').where({ user_id: userId, product_id: productId }).delete()
  await recalculateAverageRatingByProductId(productId)
}
