import { DateProvider } from "../../providers/date-provider";
import { WorkTimeFinished, WorkTimesRepository } from "../../repositories/work-times-repository";




class FinishWorkTimeService {
  constructor(
    private workTimesRepository: WorkTimesRepository,
    private dateProvider: DateProvider
  ) { }
  async execute(dateInMilliseconds: number): Promise<WorkTimeFinished> {
    const finishedAt = this.dateProvider.millisecondsToUtcDate(dateInMilliseconds)
    const {id,startedAt} = await this.workTimesRepository.getLastWorkTime()

    try {
      return await this.workTimesRepository.update({
        finishedAt,
        id,
        startedAt
      })
    } catch (error) {
      throw new Error('Erro ao tentar finalizar o horário')
    }
  }
}
export { FinishWorkTimeService };

