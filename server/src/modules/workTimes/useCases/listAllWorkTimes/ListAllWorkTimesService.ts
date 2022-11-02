import { WorkTime, WorkTimesRepository } from "../../repositories/WorkTimesRepository";

class ListAllWorkTimesService {
  constructor(private workTimersRepository: WorkTimesRepository) { }
  async execute(): Promise<WorkTime[]> {
    return this.workTimersRepository.listAll()
  }
}
export { ListAllWorkTimesService };

