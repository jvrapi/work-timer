import { WorkTime, WorkTimesRepository } from "../../repositories/WorkTimesRepository";

class GetWorkTimesByDayService {
  constructor(
    private workTimesRepository: WorkTimesRepository
  ) { }
  async execute(date: string): Promise<WorkTime[]> {
    const dates = await this.workTimesRepository.getByDate(date)
    return dates
   }
}
export { GetWorkTimesByDayService };

