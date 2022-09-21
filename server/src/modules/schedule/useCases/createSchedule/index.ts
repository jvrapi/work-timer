import SocketIO from 'socket.io'
import { PrismaScheduleRepository } from '../../repositories/prisma/PrismaScheduleRepository'
import { CreateScheduleController } from './CreateScheduleController'
import { CreateScheduleService } from './CreateScheduleService'

const createSchedule = ( socket:  SocketIO.Socket)=> {
  const repository = new PrismaScheduleRepository()
  const service = new CreateScheduleService(repository)
  const controller = new CreateScheduleController(service, socket)
  return controller.handle()
}
export { createSchedule }
