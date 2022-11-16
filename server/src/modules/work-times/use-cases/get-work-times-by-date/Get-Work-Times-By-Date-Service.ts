import { WorkTime, WorkTimesRepository } from "../../repositories/work-times-repository";

class GetWorkTimesByDateService {
  constructor(
    private workTimesRepository: WorkTimesRepository
  ) { }
  async execute(date: string): Promise<WorkTime[]> {
    const dates = await this.workTimesRepository.getByDate(date)
    return dates
   }
}
export { GetWorkTimesByDateService };

