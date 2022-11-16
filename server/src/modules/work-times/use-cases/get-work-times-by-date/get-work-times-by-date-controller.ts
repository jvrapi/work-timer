import SocketIO from 'socket.io'
import { GetWorkTimesByDateService } from './GetWorkTimesByDateService'

interface InitWorkTimeProps {
  date: string
}

class GetWorkTimesByDateController {

  constructor(
    private getWorkTimesService: GetWorkTimesByDateService,
    private socket:  SocketIO.Socket

  ){
  }

  async handle(){
    this.socket.on("getWorkTimesListByDate", async ({date}: InitWorkTimeProps) => {

      const scheduleCreate = await this.getWorkTimesService.execute(
        date
      )

      console.log(date)

      this.socket.emit("WorkTimesListByDate", scheduleCreate)
   })
  }


}
export { GetWorkTimesByDateController }
