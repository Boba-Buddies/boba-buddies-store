import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/wishlist'
import { getMockToken } from './mockToken'
import { WishlistProduct } from '../../models/Wishlist'

vi.mock('../db/wishlist.ts')
vi.mock('../logger.ts')
vi.mock('../db/users.ts')

describe('GET /api/v1/wishlist', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('should return 200/ should retrieve the user\'s wishlist', async () => {
    const fakeWishlist: WishlistProduct[] = [
      {
        id: 1,
        productId: 1,
        productName: 'Pearl Milk Tea',
        productImage: '/images/pearl-milk-tea.svg',
        productPrice: 7.5,
      }
    ]

    vi.mocked(db.getWishlistByUserId).mockResolvedValue(fakeWishlist)

    const response = await request(server)
      .get('/api/v1/wishlist')
      .set('authorization', `Bearer ${getMockToken()}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeWishlist)
  })

  it('should handle authentication failure (no token)', async () => {
    const response = await request(server)
      .get('/api/v1/wishlist')

    expect(response.status).toBe(401)
  })

  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getWishlistByUserId).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/wishlist')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})


describe('GET /api/v1/wishlist/status/:productId', () => {
  afterEach(() => { vi.resetAllMocks() })
  it('should return 200', async () => {
    const fakeProdutId = 1
    vi.mocked(db.getWishlistStatusByProductId).mockResolvedValue(true)

    const response = await request(server)
      .get(`/api/v1/wishlist/status/${fakeProdutId}`)
      .set('authorization', `Bearer ${getMockToken()}`)

    expect(response.status).toBe(200)
  })

  it('should return 500 when no access token is passed', async () => {
    const fakeProductId = 1
    vi.mocked(db.getWishlistStatusByProductId).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get(`/api/v1/wishlist/status/${fakeProductId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the wishlist status',
    })
  })
})

describe('POST /api/v1/wishlist', () => {
  afterEach(() => { vi.resetAllMocks() })
  it('should return 201 when a product is added successfully to the wishlist', async () => {
    const fakeWishlist = {
      id: 1,
      user_id: 'auth0|abc12345',
      productId: 1,
    }
    vi.mocked(db.addToWishlistByProductId).mockResolvedValue([1])
    const response = await request(server)
      .post('/api/v1/wishlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeWishlist)
    expect(response.status).toBe(201)
  })

  it('should return 500 when no access token is passed', async () => {
    const fakeWishlist = {
      id: 1,
      user_id: 'auth0|abc12345',
      productId: 1,
    }
    vi.mocked(db.addToWishlistByProductId).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/wishlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeWishlist)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Unable to insert new Product to database' })
  })
})

describe('DELETE /api/v1/wishlist/:id', () => {
  it('should return 200 when successfully deleted', async () => {
    const fakeProductId = 1
    vi.mocked(db.removeFromWishlistByProductId)
    const response = await request(server)
      .del(`/api/v1/wishlist/${fakeProductId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
  })

  it('should return 500 when no access token is passed', async () => {
    const fakeProductId = 1
    vi.mocked(db.removeFromWishlistByProductId).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .del(`/api/v1/wishlist/${fakeProductId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
  })
})