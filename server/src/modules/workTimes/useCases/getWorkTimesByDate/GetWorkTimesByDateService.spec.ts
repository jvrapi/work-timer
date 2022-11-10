import { TestWorkTimesRepository } from "../../repositories/test/TestWorkTimesRepository"
import { GetWorkTimesByDateService } from "./GetWorkTimesByDateService"

describe('Get work times by date service', ()=> {
  let getWorkTimesByDateService: GetWorkTimesByDateService

  beforeEach(()=>{
    getWorkTimesByDateService = new GetWorkTimesByDateService(TestWorkTimesRepository)
  })

  it('should be able to get all work times by date', async ()=> {
    const currentDate = new Date().toISOString()
    await getWorkTimesByDateService.execute(currentDate)
    expect(TestWorkTimesRepository.getByDate).toHaveBeenCalled()
  })
})
