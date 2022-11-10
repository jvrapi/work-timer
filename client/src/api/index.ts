import { io } from 'socket.io-client';

const {VITE_API_URL} = import.meta.env

const socket = io(VITE_API_URL);


interface WorkTimeCreated {
  id: string;
}

type WorkTimeFinished = WorkTimeCreated;

export type WorkTime = WorkTimeCreated & {
  finishedAt?: string;
  startedAt: string;
};

export const createWorkTime = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    socket.emit('createWorkTime', {
      milliseconds: Date.now(),
    });

    socket.on('workTimeCreated', ({ id }: WorkTimeCreated) => {
      if (id) {
        resolve('Novo horário criado com sucesso');
      } else {
        reject('Erro ao tentar criar um novo horário');
      }
    });
  });
};

export function finishWorkTime(): Promise<string> {
  return new Promise((resolve, reject) => {
    socket.emit('finishWorkTime', {
      milliseconds: Date.now(),
    });
    socket.on('workTimeFinished', ({ id }: WorkTimeFinished) => {
      if (id) {
        resolve('Horário encerrado com sucesso');
      } else {
        reject('Erro ao tentar encerrar o horário');
      }
    });
  });
}

export function getWorkTimesListByDate(date: string): Promise<WorkTime[]> {
  return new Promise((resolve, reject) => {
    socket.emit('getWorkTimesListByDate', {
      date
    });
    socket.on('WorkTimesListByDate', (workTime: WorkTime[]) => {
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
