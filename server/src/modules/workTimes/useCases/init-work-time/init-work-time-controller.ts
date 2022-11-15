import { Request, Response } from 'express'
import { InitWorkTimeService } from './InitWorkTimeService'

interface InitWorkTimeProps {
  milliseconds: number
}

class InitWorkTimeController {

  constructor(
    private createWorkTimerService: InitWorkTimeService,

  ){
  }

  async handle(request: Request, response: Response){
    const {milliseconds} = request.body

    
    const workTimerCreated = await this.createWorkTimerService.execute(
      milliseconds
    )

    return response.status(201).json(workTimerCreated)
  }


}
export { InitWorkTimeController }
