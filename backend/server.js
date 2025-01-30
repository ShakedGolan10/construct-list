import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import http from 'http'
import cookieParser from 'cookie-parser'

import { authMiddleware } from './middleware.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = http.createServer(app)

// Apply Middleware
app.use(helmet()) // Security headers
app.use(cookieParser()) // Parse cookies
app.use(authMiddleware) // Logging middleware

// Express App Config
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Import Routes
import authRoutes from './api/auth/auth.routes.ts'
import itemsRoutes from './api/items/items.routes.ts'

app.use('/api/auth', authRoutes)
app.use('/api/items', itemsRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Define Port and Start Server
const port = process.env.PORT || 3030
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})