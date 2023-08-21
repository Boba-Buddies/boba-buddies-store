import { Router } from 'express'
import * as db from '../db/wishlist'
import { logError } from '../logger'
const adminUserId = 'auth0|def67890'
const userId = 'auth0|abc12345'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const user = await db.getWishlistByUserId(userId)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

// GET /api/v1/wishlist/status/:productId
router.get('/status/:productId', async (req, res) => {
  const productId = Number(req.params.productId)

  try {
    const status = await db.getWishlistStatusByProductId(productId, userId)
    res.status(200).json({ status })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the wishlist status' })
  }
})

//POST add Product to wishlist /api/v1/whishlist
router.post('/', async (req, res) => {
  const { productId } = req.body
  // for the testing purpose, will give a variable after set up the authO

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

//DELETE /api/v1/wishlist/:id
router.delete('/:id', async (req, res) => {
  const productId = Number(req.params.id)

  try {
    await db.removeFromWishlistByProductId(productId, userId)
    res.sendStatus(200)
    return
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to delete the data' })
  }
})

export default router
