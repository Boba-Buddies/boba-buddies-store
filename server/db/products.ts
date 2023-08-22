import {
  LowStockProducts,
  AdminProduct,
  UpsertProduct,
  UserProduct,
} from '../../models/Products'
import db from './connection'

export async function getAllProductsAdmin() {
  return (await db('products').select(
    'id',
    'name',
    'image',
    'price',
    'description',
    'stock',
    'is_enabled as isEnabled',
    'average_rating as averageRating',
  )) as AdminProduct[]
}

export async function getAllProductsUser() {
  return (await db('products')
    .select(
      'id',
      'name',
      'image',
      'price',
      'description',
      'stock',
      'average_rating as averageRating',
    )
    .where('is_enabled', true)) as UserProduct[]
}

export async function getProductByIdAdmin(id: number) {
  return (await db('products')
    .select(
      'id',
      'name',
      'image',
      'price',
      'description',
      'stock',
      'is_enabled as isEnabled',
      'average_rating as averageRating',
    )
    .where('id', id)
    .first()) as AdminProduct
}

export async function getProductByIdUser(id: number) {
  return (await db('products')
    .select(
      'id',
      'name',
      'image',
      'price',
      'description',
      'stock',
      'average_rating as averageRating',
    )
    .where('id', id)
    .where('is_enabled', true)
    .first()) as UserProduct
}

export async function getAmountOfProductsBelowStockLevel(maxStock: number) {
  return (await db('products')
    .where('stock', '<', maxStock)
    .select('id', 'name', 'image')) as LowStockProducts
}

export async function addProduct(newProduct: UpsertProduct) {
  return await db('products').insert({
    name: newProduct.name,
    image: newProduct.image,
    price: newProduct.price,
    stock: newProduct.stock,
    description: newProduct.description,
    is_enabled: newProduct.isEnabled,
  })
}

export async function updateProduct(
  updateProduct: UpsertProduct,
  productId: number,
) {
  return await db('products').where('id', productId).update({
    name: updateProduct.name,
    image: updateProduct.image,
    price: updateProduct.price,
    stock: updateProduct.stock,
    description: updateProduct.description,
    is_enabled: updateProduct.isEnabled,
  })
}
