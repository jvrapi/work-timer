import { Request, Response } from 'express'
import { FinishWorkTimeService } from './finish-work-time-service'

interface FinishWorkTimeProps{
  milliseconds:number
}

class FinishWorkTimeController {
  constructor(
    private finishWorkTimerService: FinishWorkTimeService,
  ){}
  async handle(request: Request, response: Response){
    const {milliseconds} = request.body
    const workTimeFinished = await this.finishWorkTimerService.execute(milliseconds)
    response.json(workTimeFinished)
  }
}
export { FinishWorkTimeController }
