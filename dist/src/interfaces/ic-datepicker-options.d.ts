/// <reference types="moment" />
import Moment from 'moment';
import { IcDatepickerQuickOption } from './ic-datepicker-quick-option';
import { IcCustomDayClass } from "./ic-custom-day-class";
export interface IcDatepickerOptionsInterface {
    attrs?: {
        id?: string | null;
        name?: string | null;
        placeholder?: string | null;
        readonly?: boolean;
        tabindex?: number;
    };
    closeOnSelect?: boolean;
    customDayClasses?: IcCustomDayClass[];
    dayQuickOptions?: IcDatepickerQuickOption[];
    defaultToYearSelect?: boolean;
    disableDayFn?: Function;
    disableWeekends?: boolean;
    displayFormat?: string;
    icons?: {
        nextMonth?: string | string[];
        nextYears?: string | string[];
        previousMonth?: string | string[];
        previousYears?: string | string[];
    };
    inputClasses?: string[];
    maxDate?: Moment.Moment;
    minDate?: Moment.Moment;
    modelType?: string;
    position?: 'top' | 'bottom';
    showAdjacentMonthDays?: boolean;
    showDayQuickOptions?: boolean;
    stringModelFormat?: string;
}
