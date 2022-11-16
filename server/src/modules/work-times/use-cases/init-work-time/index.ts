import { Request, Response } from 'express'
import { DayJsDateProvider } from '../../providers/dayJs/day-js-date-provider'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/prisma-work-times-repository'
import { InitWorkTimeController } from './init-work-time-controller'
import { InitWorkTimeService } from './init-work-time-service'

const initWorkTime = (request: Request, response: Response)=> {
  const repository = new PrismaWorkTimesRepository()
  const dateProvider = new DayJsDateProvider()
  const service = new InitWorkTimeService(repository, dateProvider)
  const controller = new InitWorkTimeController(service)
  return controller.handle(request, response)
}
export { initWorkTime }
