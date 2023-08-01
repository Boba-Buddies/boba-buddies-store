import { Router } from 'express'
import * as db from '../db/wishlist'
import { logError } from '../logger'

const router = Router()

router.get('/', async (req, res) => {
  // const auth0Id = req.auth?.payload.sub
  const auth0Id = 'auth0|abc12345'

  // if (!auth0Id) {
  //   res.status(400).json({ message: 'Please provide an id' })
  //   return
  // }

  try {
    const user = await db.getWhishListByUserId(auth0Id)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

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

//GET get wishListStatus   /api/v1/whishlist/:id

router.get('/:id', async (req, res) => {
  const productId = req.params.id

  try {
    const isProductInWishlist = await db.getWishlistStatusByProductId(
      Number(productId),
    )
    res.status(200).json({ isProductInWishlist })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

export default router
