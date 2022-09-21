export interface CreateSchedule {
  startedAt: string
}

export interface CreatedSchedule {
  id: string
}

export interface ScheduleRepository{
  create(data: CreateSchedule): Promise<CreatedSchedule>
}


