import express from 'express'
import { join } from 'node:path'
import shippingRoutes from './routes/shippingOptions'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/shippings', shippingRoutes)

export default server
