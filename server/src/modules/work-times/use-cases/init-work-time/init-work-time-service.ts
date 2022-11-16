import { DateProvider } from "../../providers/date-provider"
import { WorkTimesRepository } from "../../repositories/work-times-repository"


interface CreatedSchedule {
  id:string
}


class InitWorkTimeService {
  constructor(
    private workTimesRepository: WorkTimesRepository,
    private dateProvider: DateProvider
  ) { }
  async execute(dateInMilliseconds: number): Promise<void> {

    const startedAt = this.dateProvider.millisecondsToUtcDate(dateInMilliseconds)

    try {
      await this.workTimesRepository.initWorkTime({startedAt})
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao tentar salvar um novo horário')
    }
  }
}
export { InitWorkTimeService }

