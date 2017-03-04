import * as Moment from 'moment';

import { IcDatepickerOptionsInterface } from '../interfaces/ic-datepicker-options';
import { IcDatepickerQuickOption } from '../interfaces/ic-datepicker-quick-option';
import { IcDatepickerDay } from '../interfaces/ic-datepicker-day';
import { IcDatepickerService } from '../services/ic-datepicker.service';
import { IcCustomDayClass } from "../interfaces/ic-custom-day-class";

type datepickerPosition = 'top' | 'bottom';

export const defaultDayQuickOptions = [
  {
    label: 'Today',
    date: Moment()
  },
  {
    label: 'Tomorrow',
    date: Moment().add(1, 'day')
  }
];

export class IcDatepickerOptions {
  attrs: {
    id: string | null,
    name: string | null,
    placeholder: string | null,
    readonly: boolean,
    tabindex: number
  };
  closeOnSelect: boolean;
  customDayClasses: IcCustomDayClass[];
  dayQuickOptions: IcDatepickerQuickOption[];
  defaultToYearSelect: boolean;
  disableDayFn: Function;
  disableWeekends: boolean;
  displayFormat: string;
  icons: {
    nextMonth: string | string[],
    nextYears: string | string[],
    previousMonth: string | string[],
    previousYears: string | string[]
  };
  inputClasses: string[];
  maxDate?: Moment.Moment;
  minDate?: Moment.Moment;
  modelType: string;
  position: string;
  showAdjacentMonthDays: boolean;
  showDayQuickOptions: boolean;
  stringModelFormat: string;

  private defaults = {
    attrs: {
      id: null,
      name: null,
      placeholder: null,
      readonly: true,
      tabindex: 0
    },
    closeOnSelect: true,
    customDayClasses: [],
    dayQuickOptions: defaultDayQuickOptions,
    defaultToYearSelect: false,
    disableDayFn: () => { return false; },
    disableWeekends: false,
    displayFormat: 'L',
    icons: {
      nextMonth: ['chevron', 'chevron-right'],
      nextYears: ['chevron', 'chevron-down'],
      previousMonth: ['chevron', 'chevron-left'],
      previousYears: ['chevron', 'chevron-up']
    },
    inputClasses: [],
    maxDate: undefined,
    minDate: undefined,
    modelType: 'moment',
    position: 'bottom',
    showAdjacentMonthDays: true,
    showDayQuickOptions: true,
    stringModelFormat: 'YYYY-MM-DD'
  };

  constructor(
    options: IcDatepickerOptionsInterface,
    private icDatepickerService: IcDatepickerService
  ) {
    if (options.attrs) {
      this.attrs = {
        id: options.attrs.id || this.defaults.attrs.id,
        name: options.attrs.name || this.defaults.attrs.name,
        placeholder: options.attrs.placeholder || this.defaults.attrs.placeholder,
        readonly: options.attrs.readonly || this.defaults.attrs.readonly,
        tabindex: options.attrs.tabindex || this.defaults.attrs.tabindex
      };
    } else {
      this.attrs = this.defaults.attrs;
    }

    if (options.icons) {
      this.icons = {
        nextMonth: options.icons.nextMonth || this.defaults.icons.nextMonth,
        nextYears: options.icons.nextYears || this.defaults.icons.nextYears,
        previousMonth: options.icons.previousMonth || this.defaults.icons.previousMonth,
        previousYears: options.icons.previousYears || this.defaults.icons.previousYears
      };
    } else {
      this.icons = this.defaults.icons;
    }

    this.closeOnSelect = (null == options.closeOnSelect) ? this.defaults.closeOnSelect : options.closeOnSelect;
    this.customDayClasses = options.customDayClasses || this.defaults.customDayClasses;
    this.defaultToYearSelect = options.defaultToYearSelect || this.defaults.defaultToYearSelect;
    this.disableDayFn = options.disableDayFn || this.defaults.disableDayFn;
    this.disableWeekends = (null == options.disableWeekends) ? this.defaults.disableWeekends : options.disableWeekends;
    this.displayFormat = options.displayFormat || this.defaults.displayFormat;
    this.inputClasses = options.inputClasses || this.defaults.inputClasses;
    this.maxDate = options.maxDate || this.defaults.maxDate;
    this.minDate = options.minDate || this.defaults.minDate;
    this.modelType = options.modelType || this.defaults.modelType;
    this.position = options.position || this.defaults.position as datepickerPosition;
    this.showAdjacentMonthDays = (null == options.showAdjacentMonthDays) ? this.defaults.showAdjacentMonthDays : options.showAdjacentMonthDays;
    this.showDayQuickOptions = (null == options.showDayQuickOptions) ? this.defaults.showDayQuickOptions : options.showDayQuickOptions;
    this.stringModelFormat = options.stringModelFormat || this.defaults.stringModelFormat;

    this.dayQuickOptions = this.buildDayQuickOptions(options.dayQuickOptions || this.defaults.dayQuickOptions);
  }

  /**
   * Converts an array of quick day selection options into Datepicker Day instances
   *
   * @param options
   * @returns {IcDatepickerDay[]}
   */
  private buildDayQuickOptions(options: IcDatepickerQuickOption[]): IcDatepickerQuickOption[] {
    options.map(option => {
      option.isDisabled = this.disableDayFn(option.date) ||
        (this.disableWeekends && [6, 7].indexOf(option.date.isoWeekday()) > -1);
      option.datepickerDay = this.icDatepickerService.buildDatepickerDay(
        option.date,
        this,
        option.date
      );
    });

    return options;
  }
}
