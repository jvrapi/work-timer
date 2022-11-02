import { DateProvider } from "../../../../providers/DateProvider"
import { WorkTimesRepository } from "../../repositories/WorkTimesRepository"


interface CreatedSchedule {
  id:string
}


class InitWorkTimeService {
  constructor(
    private workTimesRepository: WorkTimesRepository,
    private dateProvider: DateProvider
  ) { }
  async execute(dateInMilliseconds: number): Promise<CreatedSchedule> {

    const startedAt = this.dateProvider.millisecondsToUtcDate(dateInMilliseconds)

    try {
      const schedule = await this.workTimesRepository.initWorkTime({startedAt})
      return schedule
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao tentar salvar um novo horário')
    }
  }
}
export { InitWorkTimeService }
