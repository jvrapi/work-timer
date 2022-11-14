import { Clock, StopCircle, Timer } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  createWorkTime,
  finishWorkTime,
  getWorkTimesList,
  getWorkTimesListByDate,
  WorkTime,
} from '../../api';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import {
  getBrazilianDate,
  getDate,
  getDifferenceBetweenDates,
  getTime,
} from '../../utils/dayjs';

interface WorkTimeList {
  date: string;
  brazilianDate: string;
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
  brazilianDate: string;
  time: Time[];
}

interface WorkTimeByDateData {
  id: string;
  startedAt: string;
  finishedAt: string;
  timeWorked: string;
}

interface WorkTimeByDate {
  totalWorked: string;
  data: WorkTimeByDateData[];
}

export function SchedulesRegister() {
  const [timerInitiated, setTimerInitiated] = useState(false);
  const [workTimeList, setWorkTimeList] = useState<WorkTimeList[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [workTimeByDate, setWorkTimeByDate] = useState<WorkTimeByDate>({
    totalWorked: '',
    data: [],
  });

  useEffect(() => {
    getWorkTimers();
    verifyTimerStatus();
  }, []);

  async function verifyTimerStatus() {
    const currentDate = new Date().toISOString().split('T')[0];
    const times = await getWorkTimesListByDate(currentDate);
    const timerInitiated = !!times.find((time) => !time.finishedAt);
    setTimerInitiated(timerInitiated);
  }

  async function getWorkTimers() {
    const workTimesList = await getWorkTimesList();
    const dataFormatted = formatWorkTimeData(workTimesList);
    setWorkTimeList(dataFormatted);
  }

  async function initWorkTime() {
    const message = await createWorkTime();
    getWorkTimers();
    verifyTimerStatus();
    toast.success(message);
  }

  async function finishWork() {
    const message = await finishWorkTime();
    getWorkTimers();
    verifyTimerStatus();
    toast.success(message);
  }

  async function showWorkTimesByDate(date: string) {
    const workTimeListByDate = await getWorkTimesListByDate(date);
    let totalInMinutes = 0;
    const workTimeListByDateFormatted = workTimeListByDate.map((workTime) => {
      const { id, startedAt, finishedAt } = workTime;

      const startedAtFormatted = `${getBrazilianDate(startedAt)} às ${getTime(
        startedAt,
      )}`;

      let finishedAtFormatted = '-';
      let timeWorked = 'Horário não finalizado';

      if (finishedAt) {
        finishedAtFormatted = `${getBrazilianDate(finishedAt)} às ${getTime(finishedAt)}`;
        const diffInMinutes = getDifferenceBetweenDates(startedAt, finishedAt);
        totalInMinutes += diffInMinutes;
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        timeWorked = `${hours} Horas e ${minutes} minutos`;
      }

      const dataFormatted: WorkTimeByDateData = {
        id: id,
        timeWorked,
        startedAt: startedAtFormatted,
        finishedAt: finishedAtFormatted,
      };

      return dataFormatted;
    });

    const hours = Math.floor(totalInMinutes / 60);
    const minutes = totalInMinutes % 60;
    const totalWorked = `${hours} Horas e ${minutes} minutos`;

    const workTimeByDate = {
      totalWorked,
      data: workTimeListByDateFormatted,
    };
    setWorkTimeByDate(workTimeByDate);
    setModalIsOpen(true);
  }

  function onCloseModal() {
    setModalIsOpen(false);
  }

  function formatWorkTimeData(workTimes: WorkTime[]): WorkTimeList[] {
    const workTimeFormatted: WorkTimeList[] = [];
    const dateTimeFormatted: DateTimeFormatted[] = [];

    workTimes.forEach((workTime) => {
      const brazilianDate = getBrazilianDate(workTime.startedAt);
      const date = getDate(workTime.startedAt);
      const startedAtFormatted = getTime(workTime.startedAt);
      const finishedAtFormatted = workTime.finishedAt ? getTime(workTime.finishedAt) : '';
      const time = {
        startedAt: workTime.startedAt,
        finishedAt: workTime.finishedAt,
        finishedAtFormatted,
        startedAtFormatted,
        brazilianDate,
      };
      const dateIndex = dateTimeFormatted.findIndex(
        (dateTimeFormatted) => dateTimeFormatted.date === date,
      );

      if (dateIndex !== -1) {
        dateTimeFormatted[dateIndex].time.push(time);
      } else {
        dateTimeFormatted.push({ date, brazilianDate, time: [time] });
      }
    });

    dateTimeFormatted.forEach((dateTime) => {
      const { date, brazilianDate } = dateTime;

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
        brazilianDate,
        time,
        timeWorked: `${hours} Horas e ${minutes} minutos`,
      });
    });

    return workTimeFormatted;
  }

  return (
    <div className="flex justify-center h-full w-full text-center flex-col p-6">
      <div className="self-end flex">
        <div className="mr-2">
          <Button
            onClick={() => (timerInitiated ? finishWork() : initWorkTime())}
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

      <div className="max-h-[420px] overflow-y-auto  mt-5">
        <table className=" bg-secondary table-auto overflow-x-scroll w-full max-h-96 bg-gray-900 rounded-lg text-textColor border-spacing-y-4 border-separate">
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Horas trabalhadas</th>
              <th>Horários</th>
            </tr>
          </thead>
          <tbody>
            {workTimeList.map((workTime, index) => (
              <tr key={index} className="hover:bg-secondaryHover">
                <td title={`Dia de trabalho: ${workTime.brazilianDate}`}>
                  {workTime.brazilianDate}
                </td>
                <td
                  title={`Primeiro e último horário registrados no dia ${workTime.brazilianDate}`}
                >
                  {workTime.time}
                </td>
                <td title={`Horas trabalhadas no dia ${workTime.brazilianDate}`}>
                  {workTime.timeWorked}
                </td>
                <td>
                  <button
                    title={`Clique aqui para ver todos os horários do dia ${workTime.brazilianDate}`}
                    onClick={() => showWorkTimesByDate(workTime.date)}
                  >
                    <Clock size={30} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalIsOpen} onClose={onCloseModal}>
        <div className="max-h-[300px] overflow-y-auto">
          <table className="table-auto w-full bg-gray-900 rounded-lg mt-10 text-textColor border-spacing-y-4 border-separate">
            <thead>
              <tr>
                <th>Id</th>
                <th>Inicio</th>
                <th>Termino</th>
                <th>Quantidade de horas</th>
              </tr>
            </thead>
            <tbody className="cursor-default ">
              {workTimeByDate.data.map((workTime, index) => (
                <tr key={index} className="hover:bg-secondaryHover">
                  <td title="Id">{workTime.id}</td>
                  <td title="Inicio">{workTime.startedAt}</td>
                  <td title="Termino">{workTime.finishedAt}</td>
                  <td title="Quantidade de horas">{workTime.timeWorked}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="hover:bg-secondaryHover ">
                <td></td>
                <td></td>
                <td>Total</td>
                <td>{workTimeByDate.totalWorked}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal>
    </div>
  );
}
