import crypto from 'node:crypto';
import { InitWorkTime, ListAllWorkTimesFilters, UpdateWorkTime, WorkTime, WorkTimeInitiated, WorkTimesRepository } from "../work-times-repository";

export class InMemoryTimesRepository implements WorkTimesRepository{
  private workTimes: WorkTime[] = []
  
  async initWorkTime({
    startedAt
  }: InitWorkTime): Promise<WorkTimeInitiated> {
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
  getByDate(date: string): Promise<WorkTime[]> {
    throw new Error("Method not implemented.");
  }
  async listAll({date}: ListAllWorkTimesFilters): Promise<WorkTime[]> {
    let workTimes: WorkTime[] = this.workTimes

    if(date){
      console.log(date)
      workTimes = workTimes.filter(workTime => workTime.startedAt.toISOString().includes(date))
    }

    return workTimes
  }
  getLastWorkTime(): Promise<WorkTime> {
    throw new Error("Method not implemented.");
  }
  update(data: UpdateWorkTime): Promise<WorkTimeInitiated> {
    throw new Error("Method not implemented.");
  }

}