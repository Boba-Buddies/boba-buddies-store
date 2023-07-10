import connection from './connection'
import { Fruit } from '../../models/fruit'

export function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}
