import { WorkTime } from "@prisma/client";
import { WorkTimesRepository } from "../../repositories/work-times-repository";

interface Filters {
  date: string
}


class ListAllWorkTimesService {
  constructor(private workTimersRepository: WorkTimesRepository) { }
  async execute({date}: Filters): Promise<WorkTime[]> {
    return this.workTimersRepository.listAll({date})
  }
}
export { ListAllWorkTimesService };

