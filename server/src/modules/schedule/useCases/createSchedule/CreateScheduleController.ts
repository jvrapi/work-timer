import SocketIO from 'socket.io'
import { PrismaScheduleRepository } from '../../repositories/prisma/PrismaScheduleRepository'
import { CreateScheduleService } from './CreateScheduleService'



class CreateScheduleController {


  constructor(
    private createScheduleService: CreateScheduleService,
    private socket:  SocketIO.Socket

  ){
    const scheduleRepository = new PrismaScheduleRepository()
    this.createScheduleService = new CreateScheduleService(scheduleRepository)
  }



  async handle(){
    this.socket.on("createSchedule", (args) => {
    console.log(args)
   })
  }


}
export { CreateScheduleController }
