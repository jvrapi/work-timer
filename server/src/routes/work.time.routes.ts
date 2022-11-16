import { Router } from 'express'
import { initWorkTime } from '../modules/work-times/use-cases/init-work-time'

const workTimeRoutes = Router()

workTimeRoutes.post('/', initWorkTime)



export { workTimeRoutes }
