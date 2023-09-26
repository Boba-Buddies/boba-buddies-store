import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/products'
import { isUserAdmin } from '../db/users'
import { getMockToken } from './mockToken'
import { AdminProduct, UserProduct } from '../../models/Products'

vi.mock('../db/products.ts')
vi.mock('../logger.ts')
vi.mock('../db/users.ts')

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

describe('GET /api/v1/products/:id', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return the product by id for the user page', async () => {
    const productId = 123
    const fakeProduct: UserProduct = {
      id: 123,
      name: 'Banana Tea',
      image: '/images/banana.svg',
      price: 100,
      description: 'banana is good.',
      stock: 200,
      averageRating: 3.75,
    }

    vi.mocked(db.getProductByIdUser).mockResolvedValue(fakeProduct)
    const response = await request(server).get(`/api/v1/products/${productId}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeProduct)
  })

  it('should return 500 when unable to get the data from database', async () => {
    const productId = 123
    vi.mocked(db.getProductByIdUser).mockRejectedValue(new Error('test'))
    const response = await request(server).get(`/api/v1/products/${productId}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})

//For admin

describe('GET /api/v1/products/admin', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return 200 and all products for an admin user', async () => {
    vi.mocked(isUserAdmin).mockResolvedValue(true)
    const fakeAdminProducts: AdminProduct[] = [
      {
        id: 123,
        name: 'Banana Tea',
        image: '/images/banana.svg',
        price: 100,
        description: 'banana is good.',
        stock: 200,
        averageRating: 3.75,
        isEnabled: true,
      },
    ]

    vi.mocked(db.getAllProductsAdmin).mockResolvedValue(fakeAdminProducts)
    const response = await request(server)
      .get('/api/v1/products/admin')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeAdminProducts)
  })

  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getAllProductsAdmin).mockRejectedValue(new Error('test'))
    vi.mocked(isUserAdmin).mockResolvedValue(true)
    const response = await request(server)
      .get('/api/v1/products/admin')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })

  it('should return 401 for a non-admin user', async () => {
    vi.mocked(db.getAllProductsAdmin).mockRejectedValue(new Error('test'))
    vi.mocked(isUserAdmin).mockResolvedValue(false)
    const response = await request(server)
      .get('/api/v1/products/admin')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      message: 'user is not authorized as admin',
    })
  })
})

// describe('GET /api/v1/products/admin/:id', () => {
//   afterEach(() => {
//     vi.restoreAllMocks()
//   })
//   it('should return 200 and product for an admin user', async () => {
//     vi.mocked(isUserAdmin).mockResolvedValue(true)
//     const fakeId = 123
//     const fakeAdminProduct: AdminProduct = {
//       id: 123,
//       name: 'Banana Tea',
//       image: '/images/banana.svg',
//       price: 100,
//       description: 'banana is good.',
//       stock: 200,
//       averageRating: 3.75,
//       isEnabled: true,
//     }

//     vi.mocked(db.getProductByIdAdmin).mockResolvedValue(fakeAdminProduct)
//     vi.mocked(isUserAdmin).mockResolvedValue(true)
//     const response = await request(server)
//       .get(`/api/v1/products/admin/${fakeId}`)
//       .set('authorization', `Bearer ${getMockToken()}`)
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual(fakeAdminProduct)
//   })

//   it('should return 500 when no access token is passed', async () => {
//     vi.mocked(isUserAdmin).mockResolvedValue(false)
//     vi.mocked(db.getProductByIdAdmin).mockRejectedValue(new Error('test'))

//     const fakeId = 123
//     const response = await request(server)
//       .get(`/api/v1/products/admin/${fakeId}`)
//       .set('authorization', `Bearer ${getMockToken()}`)
//     expect(response.status).toBe(500)
//     expect(response.body).toEqual({
//       message: 'Unable to get the data from database',
//     })
//   })
// })
