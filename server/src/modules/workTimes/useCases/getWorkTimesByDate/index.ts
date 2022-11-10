import SocketIO from 'socket.io'
import { PrismaWorkTimesRepository } from "../../repositories/prisma/PrismaWorkTimesRepository"
import { GetWorkTimesByDateController } from "./GetWorkTimesByDateController"
import { GetWorkTimesByDateService } from "./GetWorkTimesByDateService"

const getWorkTimesListByDate = async (socket:  SocketIO.Socket) => {
  const repository = new PrismaWorkTimesRepository()
  const service = new GetWorkTimesByDateService(repository)
  const controller = new GetWorkTimesByDateController(service, socket)
  return controller.handle()
}

export { getWorkTimesListByDate }

