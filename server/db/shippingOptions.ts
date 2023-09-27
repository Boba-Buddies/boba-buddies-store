import { ShippingOptions } from '../../models/ShippingOptions'
import connection from './connection'

export async function getAllShippingOptions(db = connection) {
  return (await db('shipping_options').select(
    'id',
    'shipping_type as shippingType',
    'price',
  )) as ShippingOptions[]
}
