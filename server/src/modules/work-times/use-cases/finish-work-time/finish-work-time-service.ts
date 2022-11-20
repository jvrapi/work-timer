import { DateProvider } from "../../providers/date-provider";
import { WorkTimeSaved, WorkTimesRepository } from "../../repositories/work-times-repository";




class FinishWorkTimeService {
  constructor(
    private workTimesRepository: WorkTimesRepository,
    private dateProvider: DateProvider
  ) { }
  async execute(dateInMilliseconds: number): Promise<WorkTimeSaved> {
    const finishedAt = this.dateProvider.millisecondsToUtcDate(dateInMilliseconds)
    const workTime = await this.workTimesRepository.getLastWorkTime()

    if(!workTime){
      throw new Error('Work time not found')
    }

    const {id, startedAt} = workTime
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

