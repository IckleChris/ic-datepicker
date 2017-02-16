import { TestBed, inject } from '@angular/core/testing';
import Moment from 'moment';

import { IcDatepickerService } from './ic-datepicker.service';
import { IcDatepickerOptions } from '../models/ic-datepicker-options';

describe('Service: IcDatepickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ IcDatepickerService ]
    });
  });

  it('should build the day labels', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let dayLabels = service.buildDayLabels();

    expect(dayLabels).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  }));

  it('should build a datepicker day (today)', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let datepickerOptions = new IcDatepickerOptions({ displayFormat: 'L' }, service);
    let day = Moment();
    let datepickerDay = service.buildDatepickerDay(day, datepickerOptions);

    expect(datepickerDay.moment.isSame(day)).toBe(true);
    expect(datepickerDay.formattedDate).toBe(day.format('L'));
    expect(datepickerDay.isToday).toBe(true);
    expect(datepickerDay.isSelected).toBe(false);
  }));

  it('should build a datepicker day (selected)', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let datepickerOptions = new IcDatepickerOptions({ displayFormat: 'L' }, service);
    let day = Moment('2017-01-01', 'YYYY-MM-DD');
    let datepickerDay = service.buildDatepickerDay(day, datepickerOptions, day);

    expect(datepickerDay.isSelected).toBe(true);
  }));

  it('should build a datepicker day (weekend)', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let datepickerOptions = new IcDatepickerOptions({ displayFormat: 'L' }, service);
    let day = Moment('2017-01-01', 'YYYY-MM-DD').day(7);
    let datepickerDay = service.buildDatepickerDay(day, datepickerOptions);

    expect(datepickerDay.isWeekend).toBe(true);
  }));

  it('should build a datepicker day (disabled - minDate)', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let datepickerOptions = new IcDatepickerOptions({ minDate: Moment('2018-01-01', 'YYYY-MM-DD') }, service);
    let day = Moment('2017-01-01', 'YYYY-MM-DD');
    let datepickerDay = service.buildDatepickerDay(day, datepickerOptions);

    expect(datepickerDay.isDisabled).toBe(true);
  }));

  it('should build a datepicker day (disabled - maxDate)', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let datepickerOptions = new IcDatepickerOptions({ maxDate: Moment('2016-01-01', 'YYYY-MM-DD') }, service);
    let day = Moment('2017-01-01', 'YYYY-MM-DD');
    let datepickerDay = service.buildDatepickerDay(day, datepickerOptions);

    expect(datepickerDay.isDisabled).toBe(true);
  }));

  it('should build a calendar month', inject([IcDatepickerService], (service: IcDatepickerService) => {
    let datepickerOptions = new IcDatepickerOptions({}, service);
    let month = Moment('2017-01-01', 'YYYY-MM-DD');
    let days = service.buildCalendarMonth(month, datepickerOptions);

    expect(days.length).toBe(42);
  }));
});
