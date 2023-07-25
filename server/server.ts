import express from 'express'
import { join } from 'node:path'
import shippingRoutes from './routes/shippingOptions'
import productsRoutes from './routes/products'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/shippings', shippingRoutes)
server.use('/api/v1/products', productsRoutes)

export default server
