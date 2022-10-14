import SocketIO from 'socket.io'
import { registerWorkTimesHandlers } from './modules/workTimes/socketIo'

const onConnection = (socket:  SocketIO.Socket) => {
  registerWorkTimesHandlers(socket)
}


export { onConnection }
