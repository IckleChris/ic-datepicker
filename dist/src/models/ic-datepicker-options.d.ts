/// <reference types="moment" />
import * as Moment from 'moment';
import { IcDatepickerOptionsInterface } from '../interfaces/ic-datepicker-options';
import { IcDatepickerQuickOption } from '../interfaces/ic-datepicker-quick-option';
import { IcDatepickerService } from '../services/ic-datepicker.service';
import { IcCustomDayClass } from "../interfaces/ic-custom-day-class";
import { IcDatepickerIcon } from '../interfaces/ic-datepicker-icon';
export declare const defaultDayQuickOptions: {
    label: string;
    date: Moment.Moment;
}[];
export declare class IcDatepickerOptions {
    private icDatepickerService;
    attrs: {
        id: string | null;
        name: string | null;
        placeholder: string | null;
        readonly: boolean;
        tabindex: number;
    };
    closeOnSelect: boolean;
    customDayClasses: IcCustomDayClass[];
    dayQuickOptions: IcDatepickerQuickOption[];
    defaultToYearSelect: boolean;
    disableDayFn: Function;
    disableWeekends: boolean;
    displayFormat: string;
    icons: {
        nextMonth: IcDatepickerIcon;
        nextYears: IcDatepickerIcon;
        previousMonth: IcDatepickerIcon;
        previousYears: IcDatepickerIcon;
    };
    inputClasses: string[];
    maxDate?: Moment.Moment;
    minDate?: Moment.Moment;
    modelType: string;
    position: string;
    showAdjacentMonthDays: boolean;
    showDayQuickOptions: boolean;
    stringModelFormat: string;
    private defaults;
    constructor(options: IcDatepickerOptionsInterface, icDatepickerService: IcDatepickerService);
    /**
     * Converts an array of quick day selection options into Datepicker Day instances
     *
     * @param options
     * @returns {IcDatepickerDay[]}
     */
    private buildDayQuickOptions(options);
}
