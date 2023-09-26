import {
  beforeEach,
  beforeAll,
  afterAll,
  describe,
  it,
  expect
} from 'vitest'
import * as db from './emails'
import knex from 'knex'
import config from './knexfile'
const testDb = knex(config.test)

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getAllEmails', () => {
  it('returns all emails', async () => {
    const expectedAmountOfEmails = 15
    const emails = await db.getAllEmails(testDb)
    expect(emails.length).toBe(expectedAmountOfEmails)
  })

  it('emails has the correct properties', async () => {
    const emails = await db.getAllEmails(testDb)
    expect(emails[0]).toHaveProperty('id')
    expect(emails[0]).toHaveProperty('userName')
    expect(emails[0]).toHaveProperty('isRead')
    expect(emails[0]).toHaveProperty('title')
    expect(emails[0]).toHaveProperty('createdAt')
  })
})
