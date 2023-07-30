import { Router } from 'express'
import * as db from '../db/wishlist'
import { logError } from '../logger'

const router = Router()

//POST add Product to wishlist /api/v1/whishlist
router.post('/', async (req, res) => {
  const { productId } = req.body
  // for the testing purpose, will give a variable after set up the authO
  const userId = 'auth0|abc12345'

  try {
    await db.addToWishlistByProductId(Number(productId), userId)
    res.sendStatus(201)
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to insert new Product to database' })
  }
})

export default router
