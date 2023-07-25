import { Router } from 'express'
import * as db from '../db/products'
import { logError } from '../logger'
const router = Router()

// GET /api/v1/products
router.get('/', async (req, res) => {
  try {
    const products = await db.getAllProducts()
    res.status(200).json({ products })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

// GET /api/v1/products/:id
router.get('/:id', async (req, res) => {
  const productId = Number(req.params.id)
  try {
    const product = await db.getProductById(productId)
    res.status(200).json({ product })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

export default router
