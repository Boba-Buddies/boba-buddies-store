import { Router } from 'express'
import * as db from '../db/cart'
import { logError } from '../logger'
import { validateAccessToken } from '../auth0'
const router = Router()

// GETs the cart by user id

router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  console.log(auth0Id)

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const cart = await db.getCartByUserId(auth0Id)
    res.status(200).json({ cart })
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the data from the database' })
  }
})

// POST route to add a product to the user's cart

router.post('/add-item', validateAccessToken, async (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || !quantity) {
    return res.status(400).json({
      message: 'Missing required fields (productId, quantity).',
    })
  }

  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const newItem = { userId, productId, quantity }
    await db.addProductToCartByUserId(newItem)

    res.status(200).json({ message: 'Product added to the cart successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add the product to the cart.' })
  }
})

// PATCH route to update the cart item quantity by user id

router.patch('/update-quantity', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
      })
    }
    await db.updateCartItemQuantityByProductId({ userId, productId, quantity })

    res
      .status(200)
      .json({ message: 'Cart item quantity updated successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update cart item quantity.' })
  }
})

// DELETE route to delete cart item by product id

router.delete('/:productId', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const { productId } = req.params

    if (!productId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    await db.removeCartItemByProductId(userId, Number(productId))

    res.status(200).json({ message: 'Cart item removed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to remove item from cart.' })
  }
})

// DELETE route to clear cart by user id

router.delete('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    await db.clearCartByUserId(userId)
    res.status(200).json({ message: 'Successfully cleared cart.' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart.' })
  }
})

export default router
