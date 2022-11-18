import { WorkTime } from '@prisma/client';
import crypto from 'node:crypto';
import { InitWorkTime, ListAllWorkTimesFilters, UpdateWorkTime, WorkTimeSaved, WorkTimesRepository } from "../work-times-repository";

export class InMemoryTimesRepository implements WorkTimesRepository{
  private workTimes: WorkTime[] = []
  
  async initWorkTime({
    startedAt
  }: InitWorkTime): Promise<WorkTimeSaved> {
    const newWorkTime = {
      finishedAt: null,
      startedAt,
      id: crypto.randomUUID()
    }
    
    this.workTimes.push(newWorkTime)
    return {
      id: newWorkTime.id
    }
  }

  async listAll({date}: ListAllWorkTimesFilters): Promise<WorkTime[]> {
    let workTimes: WorkTime[] = this.workTimes

    if(date){
      workTimes = workTimes.filter(workTime => workTime.startedAt.toISOString().includes(date))
    }

    return workTimes
  }
  async getLastWorkTime(): Promise<WorkTime> {
    return this.workTimes.find(workTime => !workTime.finishedAt) as WorkTime
  }
  
  async update(data: UpdateWorkTime): Promise<WorkTimeSaved> {
    const workTimeIndex = this.workTimes.findIndex(workTime => workTime.id === data.id)
    this.workTimes[workTimeIndex] = data
    return {
      id: this.workTimes[workTimeIndex].id
    }
  }

  async findById(id: string): Promise<WorkTime | null> {
    const workTime = this.workTimes.find(workTime => workTime.id === id)

    if(workTime){
      return workTime
    }

    return null
  }

}