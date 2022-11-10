import SocketIO from 'socket.io'
import { finishWorkTime } from '../useCases/finishWorkTime'
import { getWorkTimesListByDate } from '../useCases/getWorkTimesByDate'
import { initWorkTime } from '../useCases/initWorkTime'
import { listAllWorkTimes } from '../useCases/listAllWorkTimes'

const registerWorkTimesHandlers = (socket: SocketIO.Socket) => {
  initWorkTime(socket)
  getWorkTimesListByDate(socket)
  listAllWorkTimes(socket)
  finishWorkTime(socket)
}


export { registerWorkTimesHandlers }
