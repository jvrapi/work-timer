import { ScheduleRepository } from "../../repositories/ScheduleRepository";

interface CreateSchedule  {
  startedAt: string
}

interface CreatedSchedule {
  id:string
}


class CreateScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository
  ) { }
  async execute({startedAt}:CreateSchedule): Promise<CreatedSchedule> {
    if(!startedAt){
      throw new Error('Missing information')
    }

    try {
      const schedule = await this.scheduleRepository.create({startedAt})
      return schedule
    } catch (error) {
      throw new Error('Erro ao tentar salvar um novo horário')
    }
  }
}
export { CreateScheduleService };

