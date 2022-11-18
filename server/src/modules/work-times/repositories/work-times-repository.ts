import { WorkTime } from "@prisma/client"

export interface InitWorkTime {
  startedAt: Date
}


export interface UpdateWorkTime{
  id: string
  finishedAt: Date
  startedAt: Date
}

export interface ListAllWorkTimesFilters {
  date?: string
}

export interface WorkTimeSaved {
  id: string
}

export interface WorkTimesRepository{
  initWorkTime(data: InitWorkTime): Promise<WorkTimeSaved>
  listAll(filters: ListAllWorkTimesFilters): Promise<WorkTime[]>
  getLastWorkTime(): Promise<WorkTime>
  update(data: UpdateWorkTime): Promise<WorkTimeSaved>
  findById(id: string): Promise<WorkTime | null>
}


