import express from 'express'
import { join } from 'node:path'

import fruitRoutes from './routes/fruits'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)

export default server
