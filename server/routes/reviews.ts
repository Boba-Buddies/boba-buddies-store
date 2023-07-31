import { Router } from 'express'
import * as db from '../db/purchases'
import { logError } from '../logger'
const router = Router()



//!GET /api/v1/reviews/product/:productId
//?Gets all the reviews associated with given productId
//db.getReviewsByProductId(productId: number)



//!GET /api/v1/reviews/amount/:date/:adminUserId
//?Gets amount of reviews from given date.
//db.getAmountOfReviewsByDate(date : string, adminUserId : string)


//!GET /api/v1/reviews/:adminUserId
//?Gets all reviews
//db.getAllReviews(adminUserId)


//!GET /api/v1/reviews/by-review-id/:id/:adminUserId
//?Get review associated with given id
//db.getReviewById(id : number, adminUserId : string)


//!POST /api/v1/reviews
//?Adds new review from req.body 
//db.addReviewByUserId(newReview : { userId : string, productId : number, description : string, rating : number })


//!PATCH api/v1/reviews/:id/:isEnabled/:adminUserId