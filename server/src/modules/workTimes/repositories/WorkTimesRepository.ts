export interface InitWorkTime {
  startedAt: string
}

export interface WorkTimeInitiated{
  id: string
}


export type WorkTime = WorkTimeInitiated & {
  finishedAt: Date | null
  startedAt: Date
}

export interface WorkTimesRepository{
  initWorkTime(data: InitWorkTime): Promise<WorkTimeInitiated>
  getByDate(date: string): Promise<WorkTime[]>
}


