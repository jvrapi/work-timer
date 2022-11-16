import crypto from 'node:crypto';
import { InitWorkTime, UpdateWorkTime, WorkTime, WorkTimeInitiated, WorkTimesRepository } from "../work-times-repository";

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
  async listAll(): Promise<WorkTime[]> {
    return this.workTimes
  }
  getLastWorkTime(): Promise<WorkTime> {
    throw new Error("Method not implemented.");
  }
  update(data: UpdateWorkTime): Promise<WorkTimeInitiated> {
    throw new Error("Method not implemented.");
  }

}