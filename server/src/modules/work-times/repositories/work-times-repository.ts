export interface InitWorkTime {
  startedAt: Date
}

export interface WorkTimeInitiated{
  id: string
}

export type  WorkTimeFinished = WorkTimeInitiated

export type WorkTime = WorkTimeInitiated & {
  finishedAt: Date | null
  startedAt: Date
}

export interface UpdateWorkTime{
  id: string
  finishedAt: string
  startedAt: Date
}

export interface ListAllWorkTimesFilters {
  date?: string
}

export interface WorkTimesRepository{
  initWorkTime(data: InitWorkTime): Promise<WorkTimeInitiated>
  getByDate(date: string): Promise<WorkTime[]>
  listAll(filters: ListAllWorkTimesFilters): Promise<WorkTime[]>
  getLastWorkTime(): Promise<WorkTime>
  update(data: UpdateWorkTime): Promise<WorkTimeFinished>
}


