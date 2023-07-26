import { ProductReviews, Review, Reviews } from '../../models/Reviews'
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
      'users.user_name as userName'
    )
    ) as ProductReviews
}

export async function getAmountOfReviewsByDate(
  date: string,
  adminUserId: string,
) {
  //Check if user is authorised. If they are:
  //return "User is not authorized"

  return await db('reviews')
    .count('* as reviewCount')
    .whereRaw('DATE(created_at) = ?', date)
    //DATE will ignore hours/minutes/seconds. It will only look at the year/month/day
    .first()
}

export async function getAllReviews(adminUserId: string) {
  //Check if user is authorised. If they are:
  //return "User is not authorized"

  return await db('reviews')
  .join('users', 'reviews.user_id', 'users.auth0_id')
  .join('products', 'reviews.product_id', 'products.id')
  .select(
    'reviews.id as id',
    'reviews.rating',
    'products.product_name as productName',
    'reviews.is_enabled as isEnabled',
    'users.user_name as userName',
    'reviews.created_at as createdAt',
  ) as Reviews
}

export async function getReviewById(id : number, adminUserId : string) {
  //Check if user is authorised. If they are:
  //return "User is not authorized"

  return await db('reviews')
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
    'reviews.created_at as reviewCreatedAt'
  )
  .first() as Review
}

