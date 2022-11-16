import { Socket } from 'socket.io'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/PrismaWorkTimesRepository'
import { ListAllWorkTimesController } from './list-all-work-times-controller'
import { ListAllWorkTimesService } from './list-all-work-times-service'

const listAllWorkTimes = (socket: Socket)=> {
  const repository = new PrismaWorkTimesRepository()
  const service = new ListAllWorkTimesService(repository)
  const controller = new ListAllWorkTimesController(service, socket)
  return controller.handle()
}
export { listAllWorkTimes }
