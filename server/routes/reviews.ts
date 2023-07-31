import { Router } from 'express'
import * as db from '../db/reviews'
import { logError } from '../logger'
const router = Router()

//GET REVIEW BY PRODUCT ID
//GET /api/v1/reviews/by-product-id/:productId
router.get('/by-product-id/:productId', async (req, res) => {
  try {
    const reviews = await db.getReviewsByProductId(Number(req.params.productId))
    res.status(200).json(reviews)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get reviews by product id' })
  }
})

//GET AMOUNT OF REVIEWS BY DATE
//GET /api/v1/reviews/amount-by-date/:date/:adminUserId
router.get('/amount-by-date/:date/:adminUserId', async (req, res) => {
  try {
    const amount = await db.getAmountOfReviewsByDate(
      req.params.date,
      req.params.adminUserId,
    )
    res.status(200).json(amount)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get amount of reviews by date' })
  }
})

//GET ALL REVIEWS
//GET /api/v1/reviews/all/:adminUserId
router.get('/all/:adminUserId', async (req, res) => {
  try {
    const allReviews = await db.getAllReviews(req.params.adminUserId)
    res.status(200).json(allReviews)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get all reviews' })
  }
})

//GET REVIEW BY ID
//GET /api/v1/reviews/by-review-id/:id/:adminUserId
router.get('/by-review-id/:id/:adminUserId', async (req, res) => {
  try {
    const review = await db.getReviewById(
      Number(req.params.id),
      req.params.adminUserId,
    )
    res.status(200).json(review)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get review by id' })
  }
})

//ADD REVIEW
//POST /api/v1/reviews/add
router.post('/add', async (req, res) => {
  try {
    await db.addReviewByUserId(req.body)
    res.status(201).json({ message: 'Review added successfully' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to add review' })
  }
})

//UPDATE REVIEW STATUS
//PATCH api/v1/reviews/update-status
router.patch('/update-status', async (req, res) => {
  try {
    const message = await db.updateReviewStatusById(req.body)
    res.status(200).json({ message })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to update review status' })
  }
})

//DELETE REVIEW
//DELETE api/v1/reviews/remove/:productId/:userId
router.delete('/remove/:productId/:userId', async (req, res) => {
  try {
    await db.removeReviewByUserId(
      Number(req.params.productId),
      req.params.userId,
    )
    res.status(200).json({ message: 'Review removed successfully' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to remove review' })
  }
})

export default router
