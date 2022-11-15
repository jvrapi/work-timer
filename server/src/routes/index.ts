import { Router } from 'express'
import { workTimeRoutes } from './work.time.routes'

const routes = Router()

routes.use('/work-time', workTimeRoutes)

export { routes }
