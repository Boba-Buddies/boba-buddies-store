import {
  beforeEach,
  beforeAll,
  afterAll,
  describe,
  it,
  expect
} from 'vitest'
import * as db from './wishlist'
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

describe('', () => {
  it('', async () => {

  })
})