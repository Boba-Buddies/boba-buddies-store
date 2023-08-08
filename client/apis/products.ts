import request from 'superagent'
import { UpsertProduct } from '../../models/Products'

const baseUrl = '/api/v1/products'

export async function fetchProductById(id: number) {
  try {
    const response = await request.get(`${baseUrl}/${id}`)
    return response.body
  } catch (error) {
    return { error }
  }
}

export async function fetchAllProducts() {
  try {
    const response = await request.get(baseUrl)
    return response.body
  } catch (error) {
    return { error }
  }
}

//!ADMIN
export async function fetchAmountOfProductsBelowStockLevel(maxStock: number) {
  try {
    const response = await request.get(`${baseUrl}/lowstock/${maxStock}`)
    return response.body
  } catch (error) {
    return { error }
  }
}

//!ADMIN
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
    return { error }
  }
}

//!ADMIN
export async function createProduct(newProduct: UpsertProduct) {
  try {
    const response = await request.post(baseUrl).send(newProduct)
    return response.body
  } catch (error) {
    return { error }
  }
}
