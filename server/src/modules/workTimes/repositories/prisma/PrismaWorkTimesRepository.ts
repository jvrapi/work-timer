import { prisma } from "../../../../prisma";
import { InitWorkTime, WorkTimeInitiated, WorkTimesRepository } from "../WorkTimesRepository";


export class PrismaWorkTimesRepository implements WorkTimesRepository{
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
