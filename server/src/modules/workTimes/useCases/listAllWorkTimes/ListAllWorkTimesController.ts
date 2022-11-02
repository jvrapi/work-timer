import { Socket } from 'socket.io'
import { ListAllWorkTimesService } from './ListAllWorkTimesService'
class ListAllWorkTimesController {
  constructor(private listAllWorkTimesService: ListAllWorkTimesService, private socket: Socket){}
  async handle(){
    this.socket.on('listAllWorkTimes', async()=> {
      const workTimes = await this.listAllWorkTimesService.execute()
      this.socket.emit('allWorkTimes', workTimes)
    })
  }
}
export { ListAllWorkTimesController }
