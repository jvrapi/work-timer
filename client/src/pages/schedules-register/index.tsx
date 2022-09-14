import { ForkKnife, StopCircle, Timer } from 'phosphor-react';
import { useState } from 'react';

import { Button } from '../../components/Button';

export function SchedulesRegister() {
  const [timerInitiated, setTimerInitiated] = useState(false);

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

  function startLaunchTime() {}

  function buildTime(started_at: string, finished_at: string) {
    const time = `${started_at} - ${finished_at}`;
    return time;
  }

  return (
    <div className="flex justify-center h-full w-full text-center flex-col bg-secondary p-6">
      <div className="self-end flex">
        <div className="mr-2">
          <Button
            onClick={() => setTimerInitiated(!timerInitiated)}
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
        <div>
          <Button
            title="Iniciar horário de almoço"
            icon={<ForkKnife weight="bold" className="w-6 h-6" />}
            onClick={() => startLaunchTime()}
          />
        </div>
      </div>

      <table className="table-auto w-full bg-gray-900 rounded-lg mt-10 text-textColor">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Almoço</th>
            <th>Horas trabalhadas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((schedule, index) => (
            <tr key={index} className="hover:bg-secondaryHover">
              <td>{schedule.date}</td>
              <td>{buildTime(schedule.started_at, schedule.finished_at)}</td>
              <td>{buildTime(schedule.started_lunch_at, schedule.finished_lunch_at)}</td>
              <td>{schedule.worked_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
