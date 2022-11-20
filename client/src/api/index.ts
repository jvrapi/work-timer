const { VITE_API_URL } = import.meta.env;

interface WorkTimeCreated {
  id: string;
}

export type WorkTime = WorkTimeCreated & {
  finishedAt?: string;
  startedAt: string;
};

export async function createWorkTime(): Promise<string> {
  const body = {
    milliseconds: Date.now(),
  };
  try {
    await fetch(`${VITE_API_URL}/work-times/`, {
      method: 'POST',
      body: objectToString(body),
    });
    return 'Novo horário criado com sucesso';
  } catch {
    return 'Erro ao tentar criar um novo horário';
  }
}

export async function finishWorkTime(): Promise<string> {
  const body = {
    milliseconds: Date.now(),
  };

  try {
    await fetch(`${VITE_API_URL}/work-times/finish`, {
      method: 'PATCH',
      body: objectToString(body),
    });
    return 'Horário encerrado com sucesso';
  } catch {
    return 'Erro ao tentar encerrar o horário';
  }
}

export async function getWorkTimesListByDate(date: string): Promise<WorkTime[]> {
  const queryParams = new URLSearchParams({
    date,
  });
  const getWorkTimesListByDateResponde = await fetch(
    `${VITE_API_URL}/work-times?${queryParams}`,
    {
      method: 'GET',
    },
  );

  const workTimesList = await getWorkTimesListByDateResponde.json();

  return workTimesList;
}

export async function getWorkTimesList(): Promise<WorkTime[]> {
  const getWorkTimesListResponde = await fetch(`${VITE_API_URL}/work-times`, {
    method: 'GET',
  });

  const workTimesList = await getWorkTimesListResponde.json();

  return workTimesList;
}

function objectToString(data: object): string {
  return JSON.stringify(data);
}
