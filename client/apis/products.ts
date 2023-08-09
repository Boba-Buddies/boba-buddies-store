import request from 'superagent'
import { Product, UpsertProduct } from '../../models/Products'

const baseUrl = '/api/v1/products'

export async function fetchProductById(id: number) {
  try {
    const response = await request.get(`${baseUrl}/${id}`)
    return response.body.product as Product
  } catch (error) {
    console.error('Error fetching product by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchAllProducts() {
  try {
    const response = await request.get(baseUrl)
    return response.body
  } catch (error) {
    console.error('Error fetching all products:', (error as Error).message)
    return { error: (error as Error).message }
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
    const response = await request
      .patch(`${baseUrl}/${id}`)
      .send(updatedProduct)
    return response.body
  } catch (error) {
    console.error('Error modifying product by ID:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function createProduct(newProduct: UpsertProduct) {
  try {
    const response = await request.post(baseUrl).send(newProduct)
    return response.body
  } catch (error) {
    console.error('Error creating product:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
