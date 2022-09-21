import SocketIO from 'socket.io'
import { createSchedule } from '../useCases/createSchedule'

const registerScheduleHandlers = (socket: SocketIO.Socket) => {

  createSchedule(socket)
}


export { registerScheduleHandlers }
