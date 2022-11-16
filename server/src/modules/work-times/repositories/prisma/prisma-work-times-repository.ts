import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { InitWorkTime, ListAllWorkTimesFilters, UpdateWorkTime, WorkTime, WorkTimeFinished, WorkTimeInitiated, WorkTimesRepository } from "../work-times-repository";

interface RawResponse{
  id: string
  started_at: Date
  finished_at: Date
}

export class PrismaWorkTimesRepository implements WorkTimesRepository{
  async getByDate(date: string): Promise<WorkTime[]> {
    const dateFormatted = `%${date}%`
    const times=await prisma.$queryRaw<RawResponse[]>`SELECT * FROM work_times WHERE started_at LIKE ${dateFormatted} ORDER BY started_at ASC, finished_at ASC`
    const timesFormatted: WorkTime[] = []
    times.forEach(time => {
      const timeFormatted = {
        id: time.id,
        finishedAt: time.finished_at,
        startedAt:time.started_at
      }
      timesFormatted.push(timeFormatted)
    })
    return timesFormatted
  }

  initWorkTime({startedAt}: InitWorkTime): Promise<WorkTimeInitiated> {
    return prisma.workTimes.create(
      {
        data:{
          startedAt
        },
        select: {
          id: true
        }
      }
    )
  }

  async listAll({date}: ListAllWorkTimesFilters): Promise<WorkTime[]> {

    const hasFilter = !!date?.length

    let whereArgs:  Prisma.Sql[] = []
    
    if(hasFilter){
      if(date){
        whereArgs.push(Prisma.sql`WHERE DATE(started_at) = ${date}`)
      }
    }


    const where = whereArgs.length ? Prisma.join(whereArgs, ' AND') : Prisma.empty

    
    const result = await prisma.$queryRaw<WorkTime[]>`
      SELECT 
        id AS id,
        started_at AS startedAt,
        finished_at AS finishedAt
      FROM work_times
      ${where}
      ORDER BY started_at ASC, finished_at ASC
    `


    return result
  }

  async getLastWorkTime(): Promise<WorkTime> {
    const currentDate = new Date().toISOString().split('T')[0]
    const currentDateFormatted = `%${currentDate}%`
    const [result]= await prisma.$queryRaw<WorkTime[]>`SELECT * FROM work_times WHERE started_at LIKE ${currentDateFormatted} AND finished_at IS NULL`
    return result
  }

  async update(data: UpdateWorkTime): Promise<WorkTimeFinished> {
    return await prisma.workTimes.update({
      where: {
        id: data.id
      },
      data,
      select: {
        id: true
      }
    })
  }


}
