import { Router } from 'express'
import * as db from '../db/products'
import { logError } from '../logger'
import {
  AdminProduct,
  UserProduct,
  upsertProductSchema,
} from '../../models/Products'
import { authorizeAdmin } from '../adminAuthorization'
const router = Router()

//!ADMIN ONLY
// GET /api/v1/products/admin
router.get('/admin', authorizeAdmin, async (req, res) => {
  try {
    const products: AdminProduct[] = await db.getAllProductsAdmin()
    res.status(200).json({ products })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

// GET /api/v1/products
router.get('/', async (req, res) => {
  try {
    const products: UserProduct[] = await db.getAllProductsUser()
    res.status(200).json({ products })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

//!ADMIN ONLY
// GET /api/v1/products/admin/:id
router.get('/admin/:id', authorizeAdmin, async (req, res) => {
  const productId = Number(req.params.id)
  try {
    const product: AdminProduct = await db.getProductByIdAdmin(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ product })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

// GET /api/v1/products/:id
router.get('/:id', async (req, res) => {
  const productId = Number(req.params.id)
  try {
    const product: UserProduct = await db.getProductByIdUser(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ product })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

//!ADMIN ONLY
// GET /api/v1/products/lowstock/:maxStock
router.get('/lowstock/:maxStock', authorizeAdmin, async (req, res) => {
  const maxStock = Number(req.params.maxStock)
  try {
    // here need to check the user's auth0_id be the admin auth0_id,will update when the user db function is ready
    const lowStockProducts = await db.getAmountOfProductsBelowStockLevel(
      maxStock,
    )
    res.status(200).json({ lowStockProducts })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

//!ADMIN ONLY
//POST add new Product /api/v1/products
router.post('/', authorizeAdmin, async (req, res) => {
  const form = req.body

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  try {
    const userResult = upsertProductSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    await db.addProduct(form)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Unable to insert new Product to database' })
  }
})

//!ADMIN ONLY
//Patch  updateProduct /api/v1/products/:id
router.patch('/:id', authorizeAdmin, async (req, res) => {
  const form = req.body
  const productId = Number(req.params.id)

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  try {
    const userResult = upsertProductSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    await db.updateProduct(form, productId)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Unable to insert new Product to database' })
  }
})
export default router
