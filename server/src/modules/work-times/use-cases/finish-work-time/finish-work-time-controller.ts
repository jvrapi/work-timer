import SocketIO from 'socket.io'
import { FinishWorkTimeService } from './FinishWorkTimeService'

interface FinishWorkTimeProps{
  milliseconds:number
}

class FinishWorkTimeController {
  constructor(
    private finishWorkTimerService: FinishWorkTimeService,
    private socket:  SocketIO.Socket
  ){}
  async handle(){
    this.socket.on('finishWorkTime', async ({milliseconds}: FinishWorkTimeProps)=> {
      const workTimeFinished = await this.finishWorkTimerService.execute(milliseconds)
      this.socket.emit('workTimeFinished', workTimeFinished)
    })
  }
}
export { FinishWorkTimeController }
