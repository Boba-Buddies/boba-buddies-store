import { Router } from 'express'
import * as db from '../db/cart'
import { logError } from '../logger'
const router = Router()

// GETs the cart by user id

const userId = 'auth0|abc12345'

// http://localhost:5173/api/v1/cart

router.get('/', async (req, res) => {
  // const userId = req.query.userId as string
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

// http://localhost:5173/api/v1/cart/add-item

router.post('/add-item', async (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || !quantity) {
    return res.status(400).json({
      message: 'Missing required fields (productId, quantity).',
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

// http://localhost:5173/api/v1/cart/update-quantity

router.patch('/update-quantity', async (req, res) => {
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

// http://localhost:5173/api/v1/cart/:productId

router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params

    if (!productId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    console.log('Deleting product with ID:', productId)

    await db.removeCartItemByProductId(userId, Number(productId))

    console.log('Product deleted!')

    res.status(200).json({ message: 'Cart item removed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to remove item from cart.' })
  }
})

// DELETE route to clear cart by user id

// http://localhost:5173/api/v1/cart/:userId

router.delete('/', async (req, res) => {
  try {
    await db.clearCartByUserId(userId)
    res.status(200).json({ message: 'Successfully cleared cart.' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart.' })
  }
})

export default router
