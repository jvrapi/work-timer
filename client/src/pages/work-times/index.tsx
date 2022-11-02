import { StopCircle, Timer } from 'phosphor-react';
import { useEffect, useState } from 'react';

import { createWorkTime, getWorkTimesList, WorkTime } from '../../api';
import { Button } from '../../components/Button';
import { getDate, getDifferenceBetweenDates, getTime } from '../../utils/dayjs';

interface WorkTimeList {
  date: string;
  time: string;
  timeWorked: string;
}

interface Time {
  startedAt: string;
  startedAtFormatted: string;
  finishedAt?: string;
  finishedAtFormatted?: string;
}
interface DateTimeFormatted {
  date: string;
  time: Time[];
}

export function SchedulesRegister() {
  const [timerInitiated, setTimerInitiated] = useState(false);
  const [workTimeList, setWorkTimeList] = useState<WorkTimeList[]>([]);

  const data = [
    {
      date: '12/09/2022',
      started_at: '08:00',
      finished_at: '18:00',
      started_lunch_at: '12:00',
      finished_lunch_at: '13:00',
      worked_time: '8 horas',
    },
    {
      date: '13/09/2022',
      started_at: '08:00',
      finished_at: '18:00',
      started_lunch_at: '12:00',
      finished_lunch_at: '13:00',
      worked_time: '8 horas',
    },
  ];

  useEffect(() => {
    getWorkTimers();
  }, []);

  async function getWorkTimers() {
    const workTimesList = await getWorkTimesList();
    const dataFormatted = formatWorkTimeData(workTimesList);
    setWorkTimeList(dataFormatted);
  }

  function formatWorkTimeData(workTimes: WorkTime[]): WorkTimeList[] {
    const workTimeFormatted: WorkTimeList[] = [];
    const dateTimeFormatted: DateTimeFormatted[] = [];

    workTimes.forEach((workTime) => {
      const date = getDate(workTime.startedAt);
      const startedAtFormatted = getTime(workTime.startedAt);
      const finishedAtFormatted = workTime.finishedAt ? getTime(workTime.finishedAt) : '';
      const time = {
        startedAt: workTime.startedAt,
        finishedAt: workTime.finishedAt,
        finishedAtFormatted,
        startedAtFormatted,
      };
      const dateIndex = dateTimeFormatted.findIndex(
        (dateTimeFormatted) => dateTimeFormatted.date === date,
      );

      if (dateIndex !== -1) {
        dateTimeFormatted[dateIndex].time.push(time);
      } else {
        dateTimeFormatted.push({ date, time: [time] });
      }
    });

    dateTimeFormatted.forEach((dateTime) => {
      const date = dateTime.date;
      const time = `${dateTime.time[0].startedAtFormatted} - ${
        dateTime.time[dateTime.time.length - 1].finishedAtFormatted ?? ''
      }`;

      let totalMinutes = 0;
      dateTime.time.forEach((time) => {
        const { startedAt, finishedAt } = time;
        if (finishedAt) {
          const diffInMinutes = getDifferenceBetweenDates(startedAt, finishedAt);

          totalMinutes += diffInMinutes;
        }
      });

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      workTimeFormatted.push({
        date,
        time,
        timeWorked: `${hours} Horas e ${minutes} minutos`,
      });
    });

    return workTimeFormatted;
  }

  async function initWorkTime() {
    setTimerInitiated(!timerInitiated);

    const message = await createWorkTime();
    console.log(message);
    getWorkTimers();
  }

  return (
    <div className="flex justify-center h-full w-full text-center flex-col bg-secondary p-6">
      <div className="self-end flex">
        <div className="mr-2">
          <Button
            onClick={() => initWorkTime()}
            title={`${timerInitiated ? 'Marcar saída' : 'Iniciar Horário'}`}
            icon={
              timerInitiated ? (
                <StopCircle weight="bold" className="w-6 h-6" />
              ) : (
                <Timer weight="bold" className="w-6 h-6" />
              )
            }
          />
        </div>
      </div>

      <table className="table-auto w-full bg-gray-900 rounded-lg mt-10 text-textColor">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Horas trabalhadas</th>
          </tr>
        </thead>
        <tbody>
          {workTimeList.map((workTime, index) => (
            <tr key={index} className="hover:bg-secondaryHover">
              <td>{workTime.date}</td>
              <td>{workTime.time}</td>
              <td>{workTime.timeWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
