import { Router } from 'express'
import { initWorkTime } from '../modules/work-times/use-cases/init-work-time'
import { listAllWorkTimes } from '../modules/work-times/use-cases/list-all-work-times'

const workTimeRoutes = Router()

workTimeRoutes.post('/', initWorkTime)
workTimeRoutes.get('/', listAllWorkTimes)



export { workTimeRoutes }
