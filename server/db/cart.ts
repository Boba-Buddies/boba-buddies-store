import connection from './connection'
import { CartItem } from '../../models/Cart'

//GET: getCartByUserId(userId: string)
export async function getCartByUserId(userId: string, db = connection) {
  return await db('cart')
    .join('products', 'cart.product_id', 'products.id')
    .where('cart.user_id', userId)
    .select(
      'cart.user_id as userId',
      'products.name as name',
      'products.id as productId',
      'products.price as price',
      'cart.quantity as quantity',
      'products.image as image',
    )
}

//POST:addProductToCartByUserId(userId: string, productId: number, quantity:number)

export async function checkIsUserInCart(userId: string, db = connection) {
  const userInCart = await db('cart').where({ user_id: userId }).first()

  return !!userInCart
}

export async function addProductToCartByUserId(
  newItem: CartItem,
  db = connection,
) {
  const isUserInCart: boolean = await checkIsUserInCart(newItem.userId)

  if (isUserInCart) {
    const existingCartItem = await db('cart')
      .where({ user_id: newItem.userId, product_id: newItem.productId })
      .first()
    if (existingCartItem) {
      // If the product is already in the cart, update its quantity
      await db('cart')
        .where({ user_id: newItem.userId, product_id: newItem.productId })
        .update({ quantity: existingCartItem.quantity + newItem.quantity })
    }
    else {
      await db('cart').insert({
        user_id: newItem.userId,
        product_id: newItem.productId,
        quantity: newItem.quantity,
      })
    }
  } else {
    await db('cart').insert({
      user_id: newItem.userId,
      product_id: newItem.productId,
      quantity: newItem.quantity,
    })
  }

}

//PATCH: updateCartItemQuantityByUserId(userId : string, productId : number, updatedQuantity : number)
export async function updateCartItemQuantityByProductId(
  updatedQuantityItem: CartItem,
  db = connection,
) {
  await db('cart')
    .where({
      user_id: updatedQuantityItem.userId,
      product_id: updatedQuantityItem.productId,
    })
    .update({ quantity: updatedQuantityItem.quantity })
}

//DELETE: removeCartItemByProductId(userId : string, productId : number)
export async function removeCartItemByProductId(
  userId: string,
  productId: number,
  db = connection,
) {
  await db('cart')
    .where('user_id', userId)
    .andWhere('product_id', productId)
    .del()
}

//DELETE: clearCartByUserId(userId: string)
export async function clearCartByUserId(userId: string, db = connection) {
  await db('cart').where('user_id', userId).del()
}
