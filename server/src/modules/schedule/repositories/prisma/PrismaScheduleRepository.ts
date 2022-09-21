import { prisma } from "../../../../prisma";
import { CreatedSchedule, CreateSchedule, ScheduleRepository } from "../ScheduleRepository";


export class PrismaScheduleRepository implements ScheduleRepository{

  async create({startedAt}: CreateSchedule): Promise<CreatedSchedule> {
    const schedule = await prisma.schedules.create({
      data:{
        startedAt
      },
      select: {
        id: true,
      }
    })

    return schedule
  }

}
