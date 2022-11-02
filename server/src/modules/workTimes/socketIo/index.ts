import SocketIO from 'socket.io'
import { getWorkTimesListByDay } from '../useCases/getWorkTimesByDay'
import { initWorkTime } from '../useCases/initWorkTime'
import { listAllWorkTimes } from '../useCases/listAllWorkTimes'

const registerWorkTimesHandlers = (socket: SocketIO.Socket) => {
  initWorkTime(socket)
  getWorkTimesListByDay(socket)
  listAllWorkTimes(socket)
}


export { registerWorkTimesHandlers }
