import { Router } from 'express'
import * as db from '../db/reviews'
import { logError } from '../logger'
import {
  newReviewSchema,
  updatedReviewStatusSchema,
} from '../../models/Reviews'
import { validateAccessToken } from '../auth0'
const router = Router()
const userId = 'auth0|abc12345'



//GET REVIEWS BY PRODUCT ID
//GET /api/v1/reviews/by-product-id/:productId
router.get('/by-product-id/:productId', validateAccessToken, async (req, res) => {
  try {
    const reviews = await db.getReviewsByProductId(Number(req.params.productId))
    res.status(200).json(reviews)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get reviews by product id' })
  }
})

//GET AMOUNT OF REVIEWS BY DATE
//GET /api/v1/reviews/amount-by-date/:date
router.get('/amount-by-date/:date', validateAccessToken, async (req, res) => {
  try {
    const amount = await db.getAmountOfReviewsByDate(req.params.date)
    res.status(200).json(amount)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get amount of reviews by date' })
  }
})

//GET ALL REVIEWS
//GET /api/v1/reviews/all
router.get('/all', validateAccessToken, async (req, res) => {
  try {
    const allReviews = await db.getAllReviews()
    res.status(200).json(allReviews)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get all reviews' })
  }
})

//GET REVIEW BY ID
//GET /api/v1/reviews/by-review-id/:id
router.get('/by-review-id/:id', validateAccessToken, async (req, res) => {
  try {
    const review = await db.getReviewById(Number(req.params.id))
    res.status(200).json(review)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get review by id' })
  }
})


//GET REVIEW BY USER ID
//GET /api/v1/reviews/user
router.get('/user', validateAccessToken, async (req, res) => {
  try {
    const userReviews = await db.getReviewsByUserId(userId)
    res.status(200).json(userReviews)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get user reviews' })
  }
})

//ADD REVIEW
//POST /api/v1/reviews/add
router.post('/add', validateAccessToken, async (req, res) => {
  const form = req.body

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  try {
    const userResult = newReviewSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    await db.addReviewByUserId(form, userId)

    res.status(201).json({ message: 'Review added successfully' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to add review' })
  }
})

//UPDATE REVIEW STATUS
//PATCH api/v1/reviews/update-status
router.patch('/update-status',  validateAccessToken, async (req, res) => {
  const form = req.body

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }
  try {
    const userResult = updatedReviewStatusSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }
    const message = await db.updateReviewStatusById(form)
    res.status(200).json({ message })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to update review status' })
  }
})

//DELETE REVIEW
//DELETE api/v1/reviews/remove/:productId
router.delete('/remove/:productId', validateAccessToken, async (req, res) => {
  try {
    await db.removeReviewByProductId(Number(req.params.productId), userId)
    res.status(200).json({ message: 'Review removed successfully' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to remove review' })
  }
})

export default router
