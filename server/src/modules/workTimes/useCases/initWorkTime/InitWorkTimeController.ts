import SocketIO from 'socket.io'
import { InitWorkTimeService } from './InitWorkTimeService'

interface InitWorkTimeProps {
  milliseconds: number
}

class InitWorkTimeController {

  constructor(
    private createWorkTimerService: InitWorkTimeService,
    private socket:  SocketIO.Socket

  ){
  }

  async handle(){
    this.socket.on("createWorkTimer", async ({milliseconds}: InitWorkTimeProps) => {

      const workTimerCreated = await this.createWorkTimerService.execute(
        milliseconds
      )

      this.socket.emit("workTimerCreated", workTimerCreated)
   })
  }


}
export { InitWorkTimeController }
