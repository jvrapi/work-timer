import { TestWorkTimesRepository } from "../../repositories/test/TestWorkTimesRepository"
import { GetWorkTimesByDayService } from "./GetWorkTimesByDayService"

describe('Get work times by day service', ()=> {
  let getWorkTimesByDayService: GetWorkTimesByDayService

  beforeEach(()=>{
    getWorkTimesByDayService = new GetWorkTimesByDayService(TestWorkTimesRepository)
  })

  it('should be able to get all work times by date', async ()=> {
    const currentDate = new Date().toISOString()
    await getWorkTimesByDayService.execute(currentDate)
    expect(TestWorkTimesRepository.getByDate).toHaveBeenCalled()
  })
})
