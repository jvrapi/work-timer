import { prisma } from "../../../../prisma";
import { InitWorkTime, WorkTime, WorkTimeInitiated, WorkTimesRepository } from "../WorkTimesRepository";


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


}
