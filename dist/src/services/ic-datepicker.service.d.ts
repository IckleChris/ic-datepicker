/// <reference types="moment" />
import * as Moment from 'moment';
import { IcDatepickerDay } from '../interfaces/ic-datepicker-day';
import { IcDatepickerOptions } from '../models/ic-datepicker-options';
export declare class IcDatepickerService {
    /**
     * Builds a single Datepicker day instance based on the provided moment object
     *
     * @param day
     * @param options
     * @param selectedDayMoment
     * @returns {{formattedDate: string, isSelected: boolean, isToday: boolean, isWeekend: boolean, moment: Moment}}
     */
    buildDatepickerDay(day: Moment.Moment, options: IcDatepickerOptions, selectedDayMoment?: Moment.Moment | null): IcDatepickerDay;
    /**
     * Returns an array of Day objects representing the month of the provided Moment instance
     *
     * @param month
     * @param selectedDayMoment
     * @param options
     * @returns {IcDatepickerDay[]}
     */
    buildCalendarMonth(month: Moment.Moment, options: IcDatepickerOptions, selectedDayMoment?: Moment.Moment | null): IcDatepickerDay[];
    /**
     * Builds the day label headers for the datepicker columns
     *
     * @returns {string[]}
     */
    buildDayLabels(): string[];
    /**
     * Returns a boolean representing whether the provided date is valid
     *
     * @param date
     * @param options
     */
    dateIsValid(date: Moment.Moment, options: IcDatepickerOptions): boolean;
    /**
     * Build the provided number of placeholder days
     *
     * @param quantity
     * @returns {IcDatepickerDay[]}
     */
    private buildPlaceholderDays(quantity);
}
