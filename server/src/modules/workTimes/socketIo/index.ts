import SocketIO from 'socket.io'
import { getWorkTimesListByDay } from '../useCases/getWorkTimesByDay'
import { initWorkTime } from '../useCases/initWorkTime'

const registerWorkTimesHandlers = (socket: SocketIO.Socket) => {
  initWorkTime(socket)
  getWorkTimesListByDay(socket)
}


export { registerWorkTimesHandlers }
