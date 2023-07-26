import {
  LowStockProducts,
  Product,
  Products,
  UpsertProduct,
} from '../../models/Products'
import db from './connection'

export async function getAllProducts() {
  return (await db('products').select(
    'id',
    'name',
    'img',
    'price',
    'price',
    'description',
    'stock',
    'is_enabled as isEnabled',
    'average_rating as averageRating',
  )) as Products
}

export async function getProductById(id: number) {
  return (await db('products')
    .where('id', id)
    .select(
      'id',
      'name',
      'img',
      'price',
      'description',
      'stock',
      'is_enabled as isEnabled',
      'average_rating as averageRating',
    )
    .first()) as Product
}

export async function getAmountOfProductsBelowStockLevel(maxStock: number) {
  return (await db('products')
    .where('stock', '<', maxStock)
    .select('id', 'name', 'img')) as LowStockProducts[]
}

export async function addProduct(newProduct: UpsertProduct) {
  return await db('products').insert({
    name: newProduct.name,
    img: newProduct.img,
    price: newProduct.price,
    stock: newProduct.stock,
    description: newProduct.description,
    is_enabled: newProduct.isEnabled,
  })
}
