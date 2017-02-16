import Moment from 'moment';
import { IcDatepickerDay } from './ic-datepicker-day';

export interface IcDatepickerQuickOption {
  date: Moment.Moment;
  datepickerDay?: IcDatepickerDay;
  isDisabled?: boolean;
  label: string;
}
