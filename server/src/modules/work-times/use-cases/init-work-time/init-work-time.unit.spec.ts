import { DateProvider } from "../../providers/DateProvider"
import { DayJsDateProvider } from "../../providers/dayJs/DayJsDateProvider"
import { TestWorkTimesRepository } from "../../repositories/test/test-work-times-repository"
import { InitWorkTimeService } from "./init-work-time-service"

describe('Init Work Service', () => {

  let initWorkTimeService: InitWorkTimeService
  let dateProvider: DateProvider

  beforeEach(() => {
    dateProvider = new DayJsDateProvider()
    initWorkTimeService = new InitWorkTimeService(TestWorkTimesRepository, dateProvider)
  })

  it('should be able to init a new work time', async () => {
    await initWorkTimeService.execute(Date.now())
    expect(TestWorkTimesRepository.initWorkTime).toHaveBeenCalled()
  })


})
