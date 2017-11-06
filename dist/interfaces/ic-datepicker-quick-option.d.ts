import * as moment from 'moment';
import { IcDatepickerDay } from './ic-datepicker-day';
export interface IcDatepickerQuickOption {
    date: moment.Moment;
    datepickerDay?: IcDatepickerDay;
    isDisabled?: boolean;
    label: string;
}
