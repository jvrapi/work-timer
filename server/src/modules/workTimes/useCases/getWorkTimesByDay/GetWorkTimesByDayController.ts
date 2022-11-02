import SocketIO from 'socket.io'
import { GetWorkTimesByDayService } from './GetWorkTimesByDayService'

interface InitWorkTimeProps {
  date: string
}

class GetWorkTimesByDayController {

  constructor(
    private getWorkTimesService: GetWorkTimesByDayService,
    private socket:  SocketIO.Socket

  ){
  }

  async handle(){
    this.socket.on("getWorkTimesListByDay", async ({date}: InitWorkTimeProps) => {

      const scheduleCreate = await this.getWorkTimesService.execute(
        date
      )

      this.socket.emit("getWorkTimesListByDay", scheduleCreate)
   })
  }


}
export { GetWorkTimesByDayController }
