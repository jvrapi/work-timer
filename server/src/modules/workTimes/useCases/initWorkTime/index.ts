import SocketIO from 'socket.io'
import { DayJsDateProvider } from '../../providers/dayJs/DayJsDateProvider'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/PrismaWorkTimesRepository'
import { InitWorkTimeController } from './InitWorkTimeController'
import { InitWorkTimeService } from './InitWorkTimeService'

const initWorkTime = ( socket:  SocketIO.Socket)=> {
  const repository = new PrismaWorkTimesRepository()
  const dateProvider = new DayJsDateProvider()
  const service = new InitWorkTimeService(repository, dateProvider)
  const controller = new InitWorkTimeController(service, socket)
  return controller.handle()
}
export { initWorkTime }
