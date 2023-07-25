import { ShippingOptions } from '../../models/ShippingOptions'
import db from './connection'

export async function getAllShippingOptions() {
  return (await db('shipping_options').select(
    'id',
    'shipping_type',
    'price',
  )) as ShippingOptions
}
