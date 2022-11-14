import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import { routes } from './routes'

import { handleErrorMiddleware } from './middlewares/HandleErrorMiddleware'


const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(handleErrorMiddleware)

export { app }

