import { Request, Response } from 'express'
import { DayJsDateProvider } from '../../providers/dayJs/day-js-date-provider'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/prisma-work-times-repository'
import { FinishWorkTimeController } from './finish-work-time-controller'
import { FinishWorkTimeService } from './finish-work-time-service'

const finishWorkTime = (request: Request, response: Response)=> {
  const repository = new PrismaWorkTimesRepository()
  const dateProvider = new DayJsDateProvider()

  const service = new FinishWorkTimeService(repository, dateProvider)
  const controller = new FinishWorkTimeController(service)
  return controller.handle(request, response)
}
export { finishWorkTime }
