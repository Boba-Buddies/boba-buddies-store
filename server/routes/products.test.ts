import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/products'
import { getMockToken } from './mockToken'
import { UserProduct } from '../../models/Products'

vi.mock('../db/products.ts')
vi.mock('../logger.ts')

//test for the users
describe('GET /api/v1/products', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return all the products for the user page', async () => {
    const fakeProducts: UserProduct[] = [
      {
        id: 123,
        name: 'Banana Tea',
        image: '/images/banana.svg',
        price: 100,
        description: 'banana is good.',
        stock: 200,
        averageRating: 3.75,
      },
    ]

    vi.mocked(db.getAllProductsUser).mockResolvedValue(fakeProducts)
    const response = await request(server).get('/api/v1/products')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeProducts)
  })

  it('should return 500 when unable to get the data from database', async () => {
    vi.mocked(db.getAllProductsUser).mockRejectedValue(new Error('test'))
    const response = await request(server).get('/api/v1/products')
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})
