import { Socket } from 'socket.io'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/PrismaWorkTimesRepository'
import { ListAllWorkTimesController } from './ListAllWorkTimesController'
import { ListAllWorkTimesService } from './ListAllWorkTimesService'

const listAllWorkTimes = (socket: Socket)=> {
  const repository = new PrismaWorkTimesRepository()
  const service = new ListAllWorkTimesService(repository)
  const controller = new ListAllWorkTimesController(service, socket)
  return controller.handle()
}
export { listAllWorkTimes }
