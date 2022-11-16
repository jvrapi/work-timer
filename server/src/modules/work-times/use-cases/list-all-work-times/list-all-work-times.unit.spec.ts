import { InMemoryTimesRepository } from "../../repositories/in-memory/in-memory-times-repository"
import { WorkTimesRepository } from "../../repositories/work-times-repository"
import { ListAllWorkTimesService } from "./list-all-work-times-service"

describe('[unit] List all work times', () => {
  let listAllWorkTimesService: ListAllWorkTimesService
  let workTimesRepository: WorkTimesRepository
  
  beforeEach(() => {
    workTimesRepository = new InMemoryTimesRepository()
    listAllWorkTimesService = new ListAllWorkTimesService(workTimesRepository)
  })

  it('should be able to list all work times', async () => {
    workTimesRepository.initWorkTime({startedAt: new Date()})
    workTimesRepository.initWorkTime({startedAt: new Date()})
    const spy = jest.spyOn(workTimesRepository, 'listAll')
    const allWorkTimes = await listAllWorkTimesService.execute({date: ''})
    expect(spy).toHaveBeenCalled()
    expect(allWorkTimes.length).toBe(2)
  })

  it('should be able to list work times with specific date', async () => {
    const firstDate = new Date()
    
    const secondDate = new Date()
    
    secondDate.setDate(secondDate.getDate() + 1)
    
    const filter = {
      date: firstDate.toISOString().split('T').shift() as string
    }
    
    workTimesRepository.initWorkTime({startedAt:firstDate})
    
    workTimesRepository.initWorkTime({startedAt: secondDate})

    
    const spy = jest.spyOn(workTimesRepository, 'listAll')

    const allWorkTimes = await listAllWorkTimesService.execute(filter)
    
    expect(spy).toHaveBeenCalledWith(filter)

    expect(allWorkTimes.length).toBe(1)

    expect(allWorkTimes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          startedAt: firstDate
        })
      ])
    )
  })
})