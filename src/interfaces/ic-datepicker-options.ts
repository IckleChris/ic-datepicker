import * as Moment from 'moment';

import { IcDatepickerQuickOption } from './ic-datepicker-quick-option';
import { IcCustomDayClass } from "./ic-custom-day-class";
import { IcDatepickerIcon } from './ic-datepicker-icon';

export interface IcDatepickerOptionsInterface {
  attrs?: {
    id?: string | null,
    name?: string | null,
    placeholder?: string | null,
    readonly?: boolean,
    tabindex?: number | null
  };
  clearInvalidDates?: boolean;
  closeOnSelect?: boolean;
  customDayClasses?: IcCustomDayClass[];
  dayQuickOptions?: IcDatepickerQuickOption[];
  defaultToYearSelect?: boolean;
  disableDayFn?: Function;
  disableWeekends?: boolean;
  displayFormat?: string;
  icons?: {
    nextMonth?: IcDatepickerIcon,
    nextYears?: IcDatepickerIcon,
    previousMonth?: IcDatepickerIcon,
    previousYears?: IcDatepickerIcon
  };
  inputClasses?: string[];
  maxDate?: Moment.Moment;
  minDate?: Moment.Moment;
  modelType?: string;
  showEmptyRow?: boolean;
  position?: 'top' | 'bottom';
  showAdjacentMonthDays?: boolean;
  showDayQuickOptions?: boolean;
  stringModelFormat?: string;
}

