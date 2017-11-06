"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var moment_1 = require("moment");
var ic_datepicker_service_1 = require("./ic-datepicker.service");
var ic_datepicker_options_1 = require("../models/ic-datepicker-options");
describe('Service: IcDatepickerService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [ic_datepicker_service_1.IcDatepickerService]
        });
    });
    it('should build the day labels', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var dayLabels = service.buildDayLabels();
        expect(dayLabels).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
    }));
    it('should build a datepicker day (today)', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var datepickerOptions = new ic_datepicker_options_1.IcDatepickerOptions({ displayFormat: 'L' }, service);
        var day = moment_1["default"]();
        var datepickerDay = service.buildDatepickerDay(day, datepickerOptions);
        expect(datepickerDay.moment.isSame(day)).toBe(true);
        expect(datepickerDay.formattedDate).toBe(day.format('L'));
        expect(datepickerDay.isToday).toBe(true);
        expect(datepickerDay.isSelected).toBe(false);
    }));
    it('should build a datepicker day (selected)', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var datepickerOptions = new ic_datepicker_options_1.IcDatepickerOptions({ displayFormat: 'L' }, service);
        var day = moment_1["default"]('2017-01-01', 'YYYY-MM-DD');
        var datepickerDay = service.buildDatepickerDay(day, datepickerOptions, day);
        expect(datepickerDay.isSelected).toBe(true);
    }));
    it('should build a datepicker day (weekend)', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var datepickerOptions = new ic_datepicker_options_1.IcDatepickerOptions({ displayFormat: 'L' }, service);
        var day = moment_1["default"]('2017-01-01', 'YYYY-MM-DD').day(7);
        var datepickerDay = service.buildDatepickerDay(day, datepickerOptions);
        expect(datepickerDay.isWeekend).toBe(true);
    }));
    it('should build a datepicker day (disabled - minDate)', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var datepickerOptions = new ic_datepicker_options_1.IcDatepickerOptions({ minDate: moment_1["default"]('2018-01-01', 'YYYY-MM-DD') }, service);
        var day = moment_1["default"]('2017-01-01', 'YYYY-MM-DD');
        var datepickerDay = service.buildDatepickerDay(day, datepickerOptions);
        expect(datepickerDay.isDisabled).toBe(true);
    }));
    it('should build a datepicker day (disabled - maxDate)', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var datepickerOptions = new ic_datepicker_options_1.IcDatepickerOptions({ maxDate: moment_1["default"]('2016-01-01', 'YYYY-MM-DD') }, service);
        var day = moment_1["default"]('2017-01-01', 'YYYY-MM-DD');
        var datepickerDay = service.buildDatepickerDay(day, datepickerOptions);
        expect(datepickerDay.isDisabled).toBe(true);
    }));
    it('should build a calendar month', testing_1.inject([ic_datepicker_service_1.IcDatepickerService], function (service) {
        var datepickerOptions = new ic_datepicker_options_1.IcDatepickerOptions({}, service);
        var month = moment_1["default"]('2017-01-01', 'YYYY-MM-DD');
        var days = service.buildCalendarMonth(month, datepickerOptions);
        expect(days.length).toBe(42);
    }));
});
