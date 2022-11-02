import SocketIO from 'socket.io'
import { PrismaWorkTimesRepository } from "../../repositories/prisma/PrismaWorkTimesRepository"
import { GetWorkTimesByDayController } from "./GetWorkTimesByDayController"
import { GetWorkTimesByDayService } from "./GetWorkTimesByDayService"

const getWorkTimesListByDay = async (socket:  SocketIO.Socket) => {
  const repository = new PrismaWorkTimesRepository()
  const service = new GetWorkTimesByDayService(repository)
  const controller = new GetWorkTimesByDayController(service, socket)

}

export { getWorkTimesListByDay }

