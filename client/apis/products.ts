import request from 'superagent'
import { UserProduct, UpsertProduct, AdminProduct } from '../../models/Products'

const baseUrl = '/api/v1/products'

//!ADMIN ONLY FUNCTION
export async function fetchProductByIdAdmin(id: number, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/admin/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body as AdminProduct
  } catch (error) {
    console.error('Error fetching product by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchProductByIdUser(id: number, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body as UserProduct
  } catch (error) {
    console.error('Error fetching product by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAllProductsAdmin(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/admin`)
      .set('Authorization', `Bearer ${token}`)
    return response.body as AdminProduct[]
  } catch (error) {
    console.error('Error fetching all products:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchAllProductsUser(token: string) {
  try {
    const response = await request
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`)
    return response.body as UserProduct[]
  } catch (error) {
    console.error('Error fetching all products:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAmountOfProductsBelowStockLevel(
  maxStock: number,
  token: string,
) {
  try {
    const response = await request
      .get(`${baseUrl}/lowstock/${maxStock}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching products below stock level:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function modifyProductById(
  id: number,
  updatedProduct: UpsertProduct,
  token: string,
) {
  try {
    await request
      .patch(`${baseUrl}/${id}`)
      .send(updatedProduct)
      .set('Authorization', `Bearer ${token}`)
  } catch (error) {
    console.error('Error modifying product by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function createProduct(newProduct: UpsertProduct, token: string) {
  try {
    await request
      .post(baseUrl)
      .send(newProduct)
      .set('Authorization', `Bearer ${token}`)
  } catch (error) {
    console.error('Error creating product:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
