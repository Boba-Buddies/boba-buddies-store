import { Router } from 'express'
import * as db from '../db/products'
import { logError } from '../logger'
import {
  AdminProduct,
  UserProduct,
  upsertProductSchema,
} from '../../models/Products'
import { validateAccessToken } from '../auth0'
import { isUserAdmin } from '../db/users'
const router = Router()


//!ADMIN ONLY
// GET /api/v1/products/admin
router.get('/admin', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const products: AdminProduct[] = await db.getAllProductsAdmin()
      res.status(200).json(products)
    } catch (error) {
      logError(error)
      res.status(500).json({ message: 'Unable to get the data from database' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

// GET /api/v1/products
router.get('/', async (req, res) => {
  try {
    const products: UserProduct[] = await db.getAllProductsUser()
    res.status(200).json(products)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

//!ADMIN ONLY
// GET /api/v1/products/admin/:id
router.get('/admin/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  const productId = Number(req.params.id)

  if (await isUserAdmin(userId)) {
    try {
      const product: AdminProduct = await db.getProductByIdAdmin(productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.status(200).json(product)
    } catch (error) {
      logError(error)
      res.status(500).json({ message: 'Unable to get the data from database' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
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
    res.status(200).json(product)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

//!ADMIN ONLY
// GET /api/v1/products/lowstock/:maxStock
router.get('/lowstock/:maxStock', validateAccessToken, async (req, res) => {
  const maxStock = Number(req.params.maxStock)

  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const lowStockProducts =
        await db.getAmountOfProductsBelowStockLevel(maxStock)
      res.status(200).json({ lowStockProducts })
    } catch (error) {
      logError(error)
      res.status(500).json({ message: 'Unable to get the data from database' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

//!ADMIN ONLY
//POST add new Product /api/v1/products
router.post('/', validateAccessToken, async (req, res) => {
  const form = req.body

  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  if (await isUserAdmin(userId)) {
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
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

//!ADMIN ONLY
//Patch  updateProduct /api/v1/products/:id
router.patch('/:id', validateAccessToken, async (req, res) => {
  const form = req.body
  const productId = Number(req.params.id)

  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  if (await isUserAdmin(userId)) {
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
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})
export default router
