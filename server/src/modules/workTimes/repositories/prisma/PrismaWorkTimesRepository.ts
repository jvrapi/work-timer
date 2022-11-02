import { prisma } from "../../../../prisma";
import { InitWorkTime, WorkTime, WorkTimeInitiated, WorkTimesRepository } from "../WorkTimesRepository";


export class PrismaWorkTimesRepository implements WorkTimesRepository{
  getByDate(date: string): Promise<WorkTime[]> {
    return prisma.workTimes.findMany({
      where: {
        startedAt: date
      },
    })
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


}
