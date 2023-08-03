import express from 'express'
import { join } from 'node:path'
import shippingOptionsRoutes from './routes/shippingOptions'
import productsRoutes from './routes/products'
import cartRoutes from './routes/cart'
import usersRoutes from './routes/users'
import emailsRoutes from './routes/emails'
import purchasesRoutes from './routes/purchases'
import reviewsRoutes from './routes/reviews'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/cart', cartRoutes)
server.use('/api/v1/shipping-options', shippingOptionsRoutes)
server.use('/api/v1/products', productsRoutes)
server.use('/api/v1/emails', emailsRoutes)
server.use('/api/v1/purchases', purchasesRoutes)
server.use('/api/v1/reviews', reviewsRoutes)

export default server
