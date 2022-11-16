import { Request, Response } from 'express'
import { ListAllWorkTimesService } from './list-all-work-times-service'
class ListAllWorkTimesController {
  constructor(private listAllWorkTimesService: ListAllWorkTimesService){}
  async handle(request: Request, response: Response){
    const date = request.query.date as string
    const workTimes = await this.listAllWorkTimesService.execute({date})
    return response.json(workTimes)
  }
}
export { ListAllWorkTimesController }
