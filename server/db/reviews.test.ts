import * as reviews from './reviews'

const mockDb: any = {
  from: jest.fn().mockReturnThis(),
  join: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  count: jest.fn().mockReturnThis(),
  first: jest.fn().mockReturnThis(),
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

  
})
