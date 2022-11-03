import { prisma } from "../../../../prisma";
import { InitWorkTime, UpdateWorkTime, WorkTime, WorkTimeFinished, WorkTimeInitiated, WorkTimesRepository } from "../WorkTimesRepository";


export class PrismaWorkTimesRepository implements WorkTimesRepository{
  getByDate(date: string): Promise<WorkTime[]> {
    const dateFormatted = `%${date}%`

    return prisma.$queryRaw`SELECT * FROM work_times WHERE started_at LIKE ${dateFormatted} ORDER BY started_at ASC, finished_at ASC`
  }

  initWorkTime({startedAt}: InitWorkTime): Promise<WorkTimeInitiated> {
    return prisma.workTimes.create(
      {
        data:{
          startedAt
        },
        select: {
          id: true,
        }
      }
    )
  }

  listAll(): Promise<WorkTime[]> {
    return prisma.workTimes.findMany({
      orderBy:[
        {startedAt: 'asc'},
        {finishedAt: 'asc'}
      ]

    })
  }

  async getLastWorkTime(): Promise<WorkTime> {
    const currentDate = new Date().toISOString().split('T')[0]
    const currentDateFormatted = `%${currentDate}%`
    console.log(currentDateFormatted)
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
