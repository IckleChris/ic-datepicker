import { Injectable } from '@angular/core';
import Moment from 'moment';
import { IcDatepickerDay } from '../interfaces/ic-datepicker-day';
import { IcDatepickerOptions } from '../models/ic-datepicker-options';
import { IcCustomDayClass } from "../interfaces/ic-custom-day-class";

@Injectable()
export class IcDatepickerService {

  /**
   * Builds a single Datepicker day instance based on the provided moment object
   *
   * @param day
   * @param options
   * @param selectedDayMoment
   * @returns {{formattedDate: string, isSelected: boolean, isToday: boolean, isWeekend: boolean, moment: Moment}}
   */
  buildDatepickerDay(
    day: Moment.Moment,
    options: IcDatepickerOptions,
    selectedDayMoment: Moment.Moment | null = null
  ): IcDatepickerDay {
    let isToday = day.isSame(Moment(), 'day');
    let isWeekend = ([6, 7].indexOf(day.isoWeekday()) > -1);
    let isDisabled = options.disableDayFn(day);
    let isSelected = (!!selectedDayMoment && day.isSame(selectedDayMoment, 'day'));
    let classes: string[] = [];

    if (!isDisabled && options.minDate) {
      isDisabled = day.isBefore(options.minDate);
    }

    if (!isDisabled && options.maxDate) {
      isDisabled = day.isAfter(options.maxDate);
    }

    options.customDayClasses.forEach((customDayClass: IcCustomDayClass) => {
      let applyClass = customDayClass.callback(day);

      if (applyClass) {
        classes = classes.concat(customDayClass.classes);
      }
    });

    return {
      classes: classes,
      formattedDate: day.format(options.displayFormat),
      isDisabled: isDisabled,
      isSelected: isSelected,
      isToday: isToday,
      isWeekend: isWeekend,
      moment: day.clone()
    };
  }

  /**
   * Returns an array of Day objects representing the month of the provided Moment instance
   *
   * @param month
   * @param selectedDayMoment
   * @param options
   * @returns {IcDatepickerDay[]}
   */
  buildCalendarMonth(
    month: Moment.Moment,
    options: IcDatepickerOptions,
    selectedDayMoment: Moment.Moment | null = null
  ): IcDatepickerDay[] {
    let period = month.clone().startOf('month');
    let periodDays: IcDatepickerDay[] = [];
    let periodEnd = period.clone().endOf('month');
    let dayNumber = period.isoWeekday();
    let endDays: number;

    periodDays = [...periodDays, ...this.buildPlaceholderDays(dayNumber - 1)];

    while (period.isSameOrBefore(periodEnd)) {
      periodDays.push(this.buildDatepickerDay(period, options, selectedDayMoment));
      period.add(1, 'day');
    }

    endDays = 7 - period.subtract(1, 'day').isoWeekday();

    /*
     * If the number of rendered weeks is 5, pad the datepicker with an extra week to maintain
     * a consistent component height. This is more important when the datepicker is positioned
     * top, to ensure that the month toggle buttons do not move during use.
     */
    let numRows = Math.ceil(periodDays.length / 7);

    if (numRows < 6) {
      endDays += (6 - numRows) * 7;
    }

    periodDays = [...periodDays, ...this.buildPlaceholderDays(endDays)];

    return periodDays;
  }

  /**
   * Builds the day label headers for the datepicker columns
   *
   * @returns {string[]}
   */
  buildDayLabels() {
    let labels: string[] = [];
    let momentObj = Moment().startOf('isoWeek');

    for (let i = 0; i < 7; i++) {
      labels.push(momentObj.format('dd'));

      momentObj.add(1, 'day');
    }

    return labels;
  }

  /**
   * Build the provided number of placeholder days
   *
   * @param quantity
   * @returns {IcDatepickerDay[]}
   */
  private buildPlaceholderDays(quantity: number) {
    let placeholderDays: IcDatepickerDay[] = [];

    for (let i = 0; i < quantity; i++) {
      placeholderDays.push({
        isPlaceholder: true,
        moment: Moment()
      });
    }

    return placeholderDays;
  }
}
