import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/shippingOptions'
import { getMockToken } from './mockToken'
import { ShippingOptions } from '../../models/ShippingOptions'

vi.mock('../db/shippingOptions.ts')
vi.mock('../logger.ts')

describe('GET /api/v1/shipping-options', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with a user', async () => {
    const fakeShippingOption: ShippingOptions[] = [
      {
        id: 1,
        shippingType: 'Banana',
        price: 19.99,
      },
    ]

    vi.mocked(db.getAllShippingOptions).mockResolvedValue(fakeShippingOption)
    const response = await request(server)
      .get('/api/v1/shipping-options')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.shippingOptions).toEqual(fakeShippingOption)
  })

  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getAllShippingOptions).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/shipping-options')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})
