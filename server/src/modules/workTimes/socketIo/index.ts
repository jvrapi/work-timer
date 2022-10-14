import SocketIO from 'socket.io'
import { initWorkTime } from '../useCases/initWorkTime'

const registerWorkTimesHandlers = (socket: SocketIO.Socket) => {

  initWorkTime(socket)
}


export { registerWorkTimesHandlers }
