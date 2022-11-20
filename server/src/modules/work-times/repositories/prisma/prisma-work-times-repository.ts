import { Prisma, WorkTime } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { InitWorkTime, ListAllWorkTimesFilters, UpdateWorkTime, WorkTimeSaved, WorkTimesRepository } from "../work-times-repository";


export class PrismaWorkTimesRepository implements WorkTimesRepository{


  initWorkTime({startedAt}: InitWorkTime): Promise<WorkTimeSaved> {
    return prisma.workTime.create(
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
    const [result]= await prisma.$queryRaw<WorkTime[]>`
       SELECT 
        id AS id,
        started_at AS startedAt,
        finished_at AS finishedAt
      FROM work_times 
      WHERE started_at LIKE ${currentDateFormatted} 
        AND finished_at IS NULL
    `
    return result
  }

  async update(data: UpdateWorkTime): Promise<WorkTimeSaved > {
    return await prisma.workTime.update({
      where: {
        id: data.id
      },
      data,
      select: {
        id: true
      }
    })
  }

  async findById(id: string): Promise<WorkTime | null> {
    const workTime = await prisma.workTime.findUnique({
      where: {
        id
      }
    })
    return workTime
  }


}
