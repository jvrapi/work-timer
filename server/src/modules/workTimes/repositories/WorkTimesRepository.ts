export interface InitWorkTime {
  startedAt: string
}

export interface WorkTimeInitiated{
  id: string
}

export interface WorkTimesRepository{
  initWorkTime(data: InitWorkTime): Promise<WorkTimeInitiated>
}


