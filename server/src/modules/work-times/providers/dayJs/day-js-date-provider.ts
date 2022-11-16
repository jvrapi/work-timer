import dayJs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DateProvider } from '../date-provider';


dayJs.extend(utc);

export class DayJsDateProvider implements DateProvider {


  millisecondsToUtcDate(milliseconds: number): Date {
    return dayJs(milliseconds).utc().local().toDate()
  }

}


