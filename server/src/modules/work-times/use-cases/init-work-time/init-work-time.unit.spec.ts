import { DateProvider } from "../../providers/date-provider"
import { DayJsDateProvider } from "../../providers/dayJs/day-js-date-provider"
import { InMemoryTimesRepository } from "../../repositories/in-memory/in-memory-times-repository"
import { WorkTimesRepository } from "../../repositories/work-times-repository"
import { InitWorkTimeService } from "./init-work-time-service"

describe('Init Work Service', () => {

  let initWorkTimeService: InitWorkTimeService
  let dateProvider: DateProvider
  let workTimesRepository: WorkTimesRepository
  beforeEach(() => {
    workTimesRepository = new InMemoryTimesRepository()
    dateProvider = new DayJsDateProvider()
    initWorkTimeService = new InitWorkTimeService(workTimesRepository, dateProvider)
  })

  it('should be able to init a new work time', async () => {
    const currentTimestamp = Date.now()
    
    const dateSpy = jest.spyOn(dateProvider, 'millisecondsToUtcDate')
    
    const repositorySpy = jest.spyOn(workTimesRepository, 'initWorkTime')
    
    await initWorkTimeService.execute(currentTimestamp)
    
    const dateSpyReturnValue = dateSpy.mock.results[0].value
    
    expect(dateSpy).toHaveBeenCalledWith(currentTimestamp)
    
    expect(repositorySpy).toHaveBeenCalledWith({startedAt: dateSpyReturnValue})
  })


})
