import { Router } from 'express'
import { initWorkTime } from '../modules/workTimes/useCases/init-work-time'

const workTimeRoutes = Router()

workTimeRoutes.post('/', initWorkTime)



export { workTimeRoutes }
