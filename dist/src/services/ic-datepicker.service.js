var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import Moment from 'moment';
var IcDatepickerService = (function () {
    function IcDatepickerService() {
    }
    /**
     * Builds a single Datepicker day instance based on the provided moment object
     *
     * @param day
     * @param options
     * @param selectedDayMoment
     * @returns {{formattedDate: string, isSelected: boolean, isToday: boolean, isWeekend: boolean, moment: Moment}}
     */
    IcDatepickerService.prototype.buildDatepickerDay = function (day, options, selectedDayMoment) {
        if (selectedDayMoment === void 0) { selectedDayMoment = null; }
        var isToday = day.isSame(Moment(), 'day');
        var isWeekend = ([6, 7].indexOf(day.isoWeekday()) > -1);
        var isDisabled = options.disableDayFn(day);
        var isSelected = (!!selectedDayMoment && day.isSame(selectedDayMoment, 'day'));
        var classes = [];
        if (!isDisabled && options.minDate) {
            isDisabled = day.isBefore(options.minDate);
        }
        if (!isDisabled && options.maxDate) {
            isDisabled = day.isAfter(options.maxDate);
        }
        options.customDayClasses.forEach(function (customDayClass) {
            var applyClass = customDayClass.callback(day);
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
    };
    /**
     * Returns an array of Day objects representing the month of the provided Moment instance
     *
     * @param month
     * @param selectedDayMoment
     * @param options
     * @returns {IcDatepickerDay[]}
     */
    IcDatepickerService.prototype.buildCalendarMonth = function (month, options, selectedDayMoment) {
        if (selectedDayMoment === void 0) { selectedDayMoment = null; }
        var period = month.clone().startOf('month');
        var periodDays = [];
        var periodEnd = period.clone().endOf('month');
        var dayNumber = period.isoWeekday();
        var endDays;
        periodDays = periodDays.concat(this.buildPlaceholderDays(dayNumber - 1));
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
        var numRows = Math.ceil(periodDays.length / 7);
        if (numRows < 6) {
            endDays += (6 - numRows) * 7;
        }
        periodDays = periodDays.concat(this.buildPlaceholderDays(endDays));
        return periodDays;
    };
    /**
     * Builds the day label headers for the datepicker columns
     *
     * @returns {string[]}
     */
    IcDatepickerService.prototype.buildDayLabels = function () {
        var labels = [];
        var momentObj = Moment().startOf('isoWeek');
        for (var i = 0; i < 7; i++) {
            labels.push(momentObj.format('dd'));
            momentObj.add(1, 'day');
        }
        return labels;
    };
    /**
     * Build the provided number of placeholder days
     *
     * @param quantity
     * @returns {IcDatepickerDay[]}
     */
    IcDatepickerService.prototype.buildPlaceholderDays = function (quantity) {
        var placeholderDays = [];
        for (var i = 0; i < quantity; i++) {
            placeholderDays.push({
                isPlaceholder: true,
                moment: Moment()
            });
        }
        return placeholderDays;
    };
    return IcDatepickerService;
}());
IcDatepickerService = __decorate([
    Injectable()
], IcDatepickerService);
export { IcDatepickerService };
//# sourceMappingURL=ic-datepicker.service.js.map