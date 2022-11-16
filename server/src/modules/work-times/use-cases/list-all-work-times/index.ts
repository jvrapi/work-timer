import { Request, Response } from 'express'
import { PrismaWorkTimesRepository } from '../../repositories/prisma/prisma-work-times-repository'
import { ListAllWorkTimesController } from './list-all-work-times-controller'
import { ListAllWorkTimesService } from './list-all-work-times-service'

const listAllWorkTimes = (request: Request, response: Response)=> {
  const repository = new PrismaWorkTimesRepository()
  const service = new ListAllWorkTimesService(repository)
  const controller = new ListAllWorkTimesController(service)
  return controller.handle(request, response)
}
export { listAllWorkTimes }
