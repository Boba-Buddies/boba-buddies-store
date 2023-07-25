import { Reviews } from '../../models/Reviews'
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
    .select(
      'product_id as productId',
      'description',
      'rating',
      'is_enabled as isEnabled',
      'user_id as userId',
      'created_at as createdAt',
    )
    .where('product_id', productId)) as Reviews
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
