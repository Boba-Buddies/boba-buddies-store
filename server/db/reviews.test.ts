import * as reviews from './reviews'
import Knex from 'knex';

jest.mock('knex');

const mockDb: any = {
  from: jest.fn().mockReturnThis(),
  join: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  whereRaw: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  count: jest.fn().mockReturnThis(),
  first: jest.fn().mockReturnThis(),
  mockReturnThis: jest.fn().mockReturnThis(),
}

jest.mock('./connection', () => {
  return jest.fn(() => mockDb)
})

describe('Reviews tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('getReviewsByProductId', async () => {
    mockDb.select.mockResolvedValueOnce([
      {
        productId: 1,
        userName: 'John',
        rating: 4.5,
        createdAt: '2023-08-08',
        description: 'Great product',
      },
    ])

    const result = await reviews.getReviewsByProductId(1)
    expect(result).toEqual([
      {
        productId: 1,
        userName: 'John',
        rating: 4.5,
        createdAt: '2023-08-08',
        description: 'Great product',
      },
    ])
  })

  it('getAmountOfReviewsByDate', async () => {
    const mockReviewsData = [
      { created_at: '2023-08-08T14:30:00' },
      { created_at: '2023-08-08T09:15:00' },
      { created_at: '2023-08-08T19:15:00' },
      { created_at: '2023-08-09T14:30:00' },
    ]

    mockDb.mockResolvedValueOnce(mockReviewsData)

    const result = await reviews.getAmountOfReviewsByDate('2023-08-08')
    expect(result).toEqual({ reviewCount: 3 })
  })
})
