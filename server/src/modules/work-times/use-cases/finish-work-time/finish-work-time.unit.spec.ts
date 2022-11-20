import { DateProvider } from "../../providers/date-provider"
import { DayJsDateProvider } from "../../providers/dayJs/day-js-date-provider"
import { InMemoryTimesRepository } from "../../repositories/in-memory/in-memory-times-repository"
import { WorkTimesRepository } from "../../repositories/work-times-repository"
import { FinishWorkTimeService } from "./finish-work-time-service"

describe('[unit] Finish work time', () => { 

  let finishWorkTimeService: FinishWorkTimeService
  let workTimesRepository: WorkTimesRepository
  let dateProvider: DateProvider

  beforeEach(()=> {
    workTimesRepository = new InMemoryTimesRepository()
    dateProvider = new DayJsDateProvider()
    finishWorkTimeService = new FinishWorkTimeService(workTimesRepository, dateProvider)
  })

  it('should be able to finish a work time', async () => {
    const startedAt = new Date()
    const finishedAt = Date.now()

    const {id: workTimeInitiated} = await workTimesRepository.initWorkTime({
      startedAt 
    })


    const lastWorkTimeSpy = jest.spyOn(workTimesRepository, 'getLastWorkTime')
    const updateWorkTimeSpy = jest.spyOn(workTimesRepository, 'update')
    const dateSpy = jest.spyOn(dateProvider, 'millisecondsToUtcDate')



    const {id: workTimeFinished} = await finishWorkTimeService.execute(finishedAt)

    const dateSpyReturnValue = dateSpy.mock.results[0].value


    const workTime = await workTimesRepository.findById(workTimeFinished)


    expect(dateSpy).toHaveBeenCalledWith(finishedAt)
    
    expect(lastWorkTimeSpy).toHaveBeenCalled()

    expect(updateWorkTimeSpy).toHaveBeenCalledWith({
      id: workTimeInitiated,
      startedAt,
      finishedAt: dateSpyReturnValue
    })

    expect(workTimeFinished).toBe(workTimeInitiated)


    expect(workTime?.finishedAt?.getTime()).toBe(finishedAt)
  })

  it('should be able to finish a work time with invalid id', async () => {
    const finishedAt = Date.now()
    const lastWorkTimeSpy = jest.spyOn(workTimesRepository, 'getLastWorkTime')
     await expect(finishWorkTimeService.execute(finishedAt)).rejects.toThrow()
    expect(lastWorkTimeSpy).toHaveBeenCalled()

  })
})