import { WishlisthProduct } from '../../models/Wishlist'
import db from './connection'

export async function getWhishListByUserId(userId: string) {
  return (await db('wishlist')
    .join('products', 'product_id', 'products.id')
    .where('users', 'users.auth0_id', 'user_id')
    .where('user_id', userId)
    .select(
      'id',
      'product_id as productId',
      'products.name as productName',
      'products.img as productImg',
      'products.price as productPrice',
    )) as WishlisthProduct
}
