import dayJs from 'dayjs'
import { DateProvider } from '../DateProvider'
import utc from 'dayjs/plugin/utc';


dayJs.extend(utc);

export class DayJsDateProvider implements DateProvider {


  millisecondsToUtcDate(milliseconds: number): string {
    return dayJs(milliseconds).utc().local().format()
  }

}


