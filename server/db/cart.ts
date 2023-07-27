import connection from './connection'
import { Cart, CartItem } from '../../models/Cart'

//GET: getCartByUserId(userId: string)
export async function getCartByUserId(userId: string, db = connection) {
  return await db('cart')
    .join('products', 'cart.product_id', 'product.id')
    .where('cart.product_id', userId)
    .select(
      'cart.user_id as userId',
      'products.name as name',
      'products.id as productId',
      'products.price as price',
      'cart.quantity as quantity',
      'products.img_src as img',
    )
}

//POST:addProductToCartByUserId(userId: string, productId: number, quantity:number)

export async function addProductToCartByUserId(
  newItem: CartItem
  db = connection,
) {
  try {
    const existingCartItem = await db('cart')
      .where({ user_id: userId, product_id: productId })
      .first()

    if (existingCartItem) {
      await db('cart')
        .where({ user_id: userId, product_id: productId })
        .update({ quantity: existingCartItem.quantity + quantity })
    } else {
      await db('cart').insert({
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      })
    }

    return true
  } catch (error) {
    console.error('Error adding product to cart:', error)
    return false
  }
}

//PATCH: updateCartItemQuantityByUserId(userId : string, productId : number, updatedQuantity : number)
export async function updateCartItemQuantityByUserId(userId : string, productId : number, updatedQuantity : number, db = connection){
  return db('cart').where('user_id', userId).where('product_id', productId).first()
}

//DELETE: removeCartItemByUserId(userId : string, productId : number)
export async function removeCartItemByUserId(
  userId: string,
  productId: number,
  db = connection,
) {
  return db('cart')
    .where('user_id', userId)
    .andWhere('product_id', productId)
    .del()
}

//DELETE: clearCartByUserId(userId: string)
export async function clearCartByUserId(userId: string, db = connection) {
  return db('cart').where('user_id', userId).del()
}
