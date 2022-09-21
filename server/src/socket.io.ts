import SocketIO from 'socket.io'
import { registerScheduleHandlers } from './modules/schedule/socketIo'

const onConnection = (socket:  SocketIO.Socket) => {
  registerScheduleHandlers(socket)
}


export { onConnection }
