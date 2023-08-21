import request from 'superagent'
import { UserProduct, UpsertProduct, AdminProduct } from '../../models/Products'

const baseUrl = '/api/v1/products'

//!ADMIN ONLY FUNCTION
export async function fetchProductByIdAdmin(id: number) {
  try {
    const response = await request.get(`${baseUrl}/admin/${id}`)
    return response.body.product as AdminProduct
  } catch (error) {
    console.error('Error fetching product by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchProductByIdUser(id: number) {
  try {
    const response = await request.get(`${baseUrl}/${id}`)
    return response.body.product as UserProduct
  } catch (error) {
    console.error('Error fetching product by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAllProductsAdmin() {
  try {
    const response = await request.get(`${baseUrl}/admin`)
    return response.body as AdminProduct[]
  } catch (error) {
    console.error('Error fetching all products:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}


export async function fetchAllProductsUser() {
  try {
    const response = await request.get(baseUrl)
    return response.body as UserProduct[]
  } catch (error) {
    console.error('Error fetching all products:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAmountOfProductsBelowStockLevel(maxStock: number) {
  try {
    const response = await request.get(`${baseUrl}/lowstock/${maxStock}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching products below stock level:',
      (error as Error).message,
    )
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function modifyProductById(
  id: number,
  updatedProduct: UpsertProduct,
) {
  try {
    await request.patch(`${baseUrl}/${id}`).send(updatedProduct)
  } catch (error) {
    console.error('Error modifying product by ID:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function createProduct(newProduct: UpsertProduct) {
  try {
    await request.post(baseUrl).send(newProduct)
  } catch (error) {
    console.error('Error creating product:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
