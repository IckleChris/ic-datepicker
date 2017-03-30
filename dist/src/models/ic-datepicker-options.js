import * as Moment from 'moment';
export var defaultDayQuickOptions = [
    {
        label: 'Today',
        date: Moment()
    },
    {
        label: 'Tomorrow',
        date: Moment().add(1, 'day')
    }
];
var IcDatepickerOptions = (function () {
    function IcDatepickerOptions(options, icDatepickerService) {
        this.icDatepickerService = icDatepickerService;
        this.defaults = {
            attrs: {
                id: null,
                name: null,
                placeholder: null,
                readonly: true,
                tabindex: null
            },
            clearInvalidDates: true,
            closeOnSelect: true,
            customDayClasses: [],
            dayQuickOptions: defaultDayQuickOptions,
            defaultToYearSelect: false,
            disableDayFn: function () { return false; },
            disableWeekends: false,
            displayFormat: 'L',
            icons: {
                nextMonth: { classes: ['chevron', 'chevron-right'] },
                nextYears: { classes: ['chevron', 'chevron-down'] },
                previousMonth: { classes: ['chevron', 'chevron-left'] },
                previousYears: { classes: ['chevron', 'chevron-up'] }
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
        if (options.attrs) {
            this.attrs = {
                id: options.attrs.id || this.defaults.attrs.id,
                name: options.attrs.name || this.defaults.attrs.name,
                placeholder: options.attrs.placeholder || this.defaults.attrs.placeholder,
                readonly: options.attrs.readonly || this.defaults.attrs.readonly,
                tabindex: options.attrs.tabindex || this.defaults.attrs.tabindex
            };
        }
        else {
            this.attrs = this.defaults.attrs;
        }
        if (options.icons) {
            this.icons = {
                nextMonth: options.icons.nextMonth || this.defaults.icons.nextMonth,
                nextYears: options.icons.nextYears || this.defaults.icons.nextYears,
                previousMonth: options.icons.previousMonth || this.defaults.icons.previousMonth,
                previousYears: options.icons.previousYears || this.defaults.icons.previousYears
            };
        }
        else {
            this.icons = this.defaults.icons;
        }
        this.clearInvalidDates = (null == options.clearInvalidDates) ? this.defaults.clearInvalidDates : options.clearInvalidDates;
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
        this.position = options.position || this.defaults.position;
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
    IcDatepickerOptions.prototype.buildDayQuickOptions = function (options) {
        var _this = this;
        options.map(function (option) {
            option.isDisabled = _this.disableDayFn(option.date) ||
                (_this.disableWeekends && [6, 7].indexOf(option.date.isoWeekday()) > -1);
            option.datepickerDay = _this.icDatepickerService.buildDatepickerDay(option.date, _this, option.date);
        });
        return options;
    };
    return IcDatepickerOptions;
}());
export { IcDatepickerOptions };
//# sourceMappingURL=ic-datepicker-options.js.map