import { Router } from 'express'
import * as db from '../db/cart'
import { logError } from '../logger'
import { Cart, CartItem, cartItemSchema } from '../../models/Cart'
const router = Router()

router.get('/', async (req, res) => {
  const userId = req.query.userId as string
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' })
    }

    const cart = await db.getCartByUserId(userId)
    res.status(200).json({ cart })
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the data from the database' })
  }
})

// POST route to add a product to the user's cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body

  if (!userId || !productId || !quantity) {
    return res.status(400).json({
      message: 'Missing required fields (userId, productId, quantity).',
    })
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
router.patch('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body

    if (!userId || !productId || !quantity) {
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

router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params

    if (!userId || !productId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    await db.removeCartItemByProductId(userId, Number(productId))

    res.status(200).json({ message: 'Cart item removed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart.' })
  }
})

export default router
