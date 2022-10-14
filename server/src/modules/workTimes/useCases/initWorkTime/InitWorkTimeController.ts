import SocketIO from 'socket.io'
import { InitWorkTimeService } from './InitWorkTimeService'

interface InitWorkTimeProps {
  milliseconds: number
}

class InitWorkTimeController {

  constructor(
    private createScheduleService: InitWorkTimeService,
    private socket:  SocketIO.Socket

  ){
  }

  async handle(){
    this.socket.on("createSchedule", async ({milliseconds}: InitWorkTimeProps) => {

      const scheduleCreate = await this.createScheduleService.execute(
        milliseconds
      )

      this.socket.emit("scheduleCreated", scheduleCreate)
   })
  }


}
export { InitWorkTimeController }
