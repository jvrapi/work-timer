import SocketIO from 'socket.io'
import { finishWorkTime } from '../useCases/finishWorkTime'
import { getWorkTimesListByDay } from '../useCases/getWorkTimesByDay'
import { initWorkTime } from '../useCases/initWorkTime'
import { listAllWorkTimes } from '../useCases/listAllWorkTimes'

const registerWorkTimesHandlers = (socket: SocketIO.Socket) => {
  initWorkTime(socket)
  getWorkTimesListByDay(socket)
  listAllWorkTimes(socket)
  finishWorkTime(socket)
}


export { registerWorkTimesHandlers }
