import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/wishlist'
import { isUserAdmin } from '../db/users'
import { getMockToken } from './mockToken'
import { WishlistProduct } from '../../models/Wishlist'

vi.mock('../db/wishlist.ts')
vi.mock('../logger.ts')
vi.mock('../db/users.ts')

describe('GET /api/v1/wishlist', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('should return 200 with a user', async () => {
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
    const fakeProdutId = 1
    vi.mocked(db.getWishlistStatusByProductId).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get(`/api/v1/wishlist/status/${fakeProdutId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the wishlist status',
    })
  })
})
