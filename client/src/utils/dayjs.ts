import dayJs from 'dayjs';
export function getDate(date: string): string {
  return dayJs(date).format('DD/MM/YYYY');
}

export function getTime(date: string): string {
  return dayJs(date).format('HH:mm');
}

export function getDifferenceBetweenDates(
  firstDateAsString: string,
  secondDateAsString: string,
): number {
  const firstDate = dayJs(firstDateAsString);
  const secondDate = dayJs(secondDateAsString);

  return secondDate.diff(firstDate, 'minutes');
}
