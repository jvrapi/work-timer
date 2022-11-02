import { io } from 'socket.io-client';

const socket = io('http://localhost:3333/');

interface WorkTimesCreated {
  id: string;
}

export type WorkTime = WorkTimesCreated & {
  finishedAt?: string;
  startedAt: string;
};

export const createWorkTime = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    socket.emit('createWorkTime', {
      milliseconds: Date.now(),
    });

    socket.on('workTimeCreated', ({ id }: WorkTimesCreated) => {
      if (id) {
        resolve('Novo horário criado com sucesso');
      } else {
        reject('Erro ao tentar criar um novo horário');
      }
    });
  });
};

export function getWorkTimesListByDate(): Promise<WorkTime[]> {
  return new Promise((resolve, reject) => {
    socket.emit('getWorkTimesListByDay', {
      date: new Date().toISOString().split('T')[0],
    });
    socket.on('WorkTimesListByDay', (workTime: WorkTime[]) => {
      if (workTime) {
        resolve(workTime);
      } else {
        reject('Erro ao tentar recuperar a lista de horários');
      }
    });
  });
}

export function getWorkTimesList(): Promise<WorkTime[]> {
  return new Promise((resolve, reject) => {
    socket.emit('listAllWorkTimes');
    socket.on('allWorkTimes', (workTimes: WorkTime[]) => {
      if (workTimes) {
        resolve(workTimes);
      } else {
        reject('Erro ao tentar recuperar a lista de horários');
      }
    });
  });
}
