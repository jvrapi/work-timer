import { Socket } from 'socket.io'
import { DayJsDateProvider } from '../../providers/dayJs/DayJsDateProvider'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/PrismaWorkTimesRepository'
import { FinishWorkTimeController } from './finish-work-time-controller'
import { FinishWorkTimeService } from './finish-work-time-service'

const finishWorkTime = (socket: Socket)=> {
  const repository = new PrismaWorkTimesRepository()
  const dateProvider = new DayJsDateProvider()

  const service = new FinishWorkTimeService(repository, dateProvider)
  const controller = new FinishWorkTimeController(service, socket)
  return controller.handle()
}
export { finishWorkTime }
