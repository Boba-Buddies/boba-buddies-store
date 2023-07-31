import { Router } from 'express'
import * as db from '../db/purchases'
import { logError } from '../logger'
const router = Router()

//!GET /api/v1/reviews/by-product-id/:productId
//?Gets all the reviews associated with given productId
//db.getReviewsByProductId(productId: number)

//!GET /api/v1/reviews/amount-by-date/:date/:adminUserId
//?Gets amount of reviews from given date.
//db.getAmountOfReviewsByDate(date : string, adminUserId : string)

//!GET /api/v1/reviews/all/:adminUserId
//?Gets all reviews
//db.getAllReviews(adminUserId)

//!GET /api/v1/reviews/by-review-id/:id/:adminUserId
//?Get review associated with given id
//db.getReviewById(id : number, adminUserId : string)

//!POST /api/v1/reviews/add
//?Adds new review from req.body
//db.addReviewByUserId(newReview : { userId : string, productId : number, description : string, rating : number })

//!PATCH api/v1/reviews/status
//?Modifies review status from given information from req.body
//db.updateReviewStatusById(updatedReviewStatus : {id : number, isEnabled : boolean, adminUserId : string})

//!DELETE api/v1/reviews/remove/:productId/:userId
//?Deletes review associated with given productId and userId
//db.removeReviewByUserId(userId : string, productId : number)
