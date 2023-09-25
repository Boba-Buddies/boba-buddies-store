import { beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import knex from 'knex'
import * as db from './shippingOptions'
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

describe('getAllShippingOptions', () => {
  it('returns all the shipping option', async () => {
    const testShippingType = 'Standard (3-7 working days)'
    const shippingOptions = await db.getAllShippingOptions(testDb)

    expect(shippingOptions[0].shippingType).toBe(testShippingType)
  })
})
