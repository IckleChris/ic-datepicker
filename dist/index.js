import { Component, ElementRef, EventEmitter, HostListener, Inject, Injectable, Input, NgModule, Output, Renderer, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

var defaultDayQuickOptions = [
    {
        label: 'Today',
        date: moment()
    },
    {
        label: 'Tomorrow',
        date: moment().add(1, 'day')
    }
];
var IcDatepickerOptions = (function () {
    /**
     * @param {?} options
     * @param {?} icDatepickerService
     */
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
            showEmptyRow: true,
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
        this.showEmptyRow = (null == options.showEmptyRow) ? this.defaults.showEmptyRow : options.showEmptyRow;
        this.stringModelFormat = options.stringModelFormat || this.defaults.stringModelFormat;
        this.dayQuickOptions = this.buildDayQuickOptions(options.dayQuickOptions || this.defaults.dayQuickOptions);
    }
    /**
     * Converts an array of quick day selection options into Datepicker Day instances
     *
     * @param {?} options
     * @return {?}
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

var IcDatepickerService = (function () {
    function IcDatepickerService() {
    }
    /**
     * Builds a single Datepicker day instance based on the provided moment object
     *
     * @param {?} day
     * @param {?} options
     * @param {?=} selectedDayMoment
     * @return {?}
     */
    IcDatepickerService.prototype.buildDatepickerDay = function (day, options, selectedDayMoment) {
        if (selectedDayMoment === void 0) { selectedDayMoment = null; }
        var /** @type {?} */ isToday = day.isSame(moment(), 'day');
        var /** @type {?} */ isWeekend = ([6, 7].indexOf(day.isoWeekday()) > -1);
        var /** @type {?} */ isDisabled = options.disableDayFn(day);
        var /** @type {?} */ isSelected = (!!selectedDayMoment && day.isSame(selectedDayMoment, 'day'));
        var /** @type {?} */ classes = [];
        if (!isDisabled && options.minDate) {
            isDisabled = day.isBefore(options.minDate);
        }
        if (!isDisabled && options.maxDate) {
            isDisabled = day.isAfter(options.maxDate);
        }
        options.customDayClasses.forEach(function (customDayClass) {
            var /** @type {?} */ applyClass = customDayClass.callback(day);
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
     * @param {?} month
     * @param {?} options
     * @param {?=} selectedDayMoment
     * @return {?}
     */
    IcDatepickerService.prototype.buildCalendarMonth = function (month, options, selectedDayMoment) {
        if (selectedDayMoment === void 0) { selectedDayMoment = null; }
        var /** @type {?} */ period = month.clone().startOf('month');
        var /** @type {?} */ periodDays = [];
        var /** @type {?} */ periodEnd = period.clone().endOf('month');
        var /** @type {?} */ dayNumber = period.isoWeekday();
        var /** @type {?} */ endDays;
        periodDays = periodDays.concat(this.buildPlaceholderDays(dayNumber - 1));
        while (period.isSameOrBefore(periodEnd)) {
            periodDays.push(this.buildDatepickerDay(period, options, selectedDayMoment));
            period.add(1, 'day');
        }
        endDays = 7 - period.subtract(1, 'day').isoWeekday();
        /*
         * If the showEmptyRow config option is true, and If the number of rendered weeks is 5, pad the datepicker with
         * an extra week to maintain a consistent component height. This is more important when the datepicker is
         * positioned top, to ensure that the month toggle buttons do not move during use.
         */
        if (options.showEmptyRow) {
            var /** @type {?} */ numRows = Math.ceil(periodDays.length / 7);
            if (numRows < 6) {
                endDays += (6 - numRows) * 7;
            }
        }
        periodDays = periodDays.concat(this.buildPlaceholderDays(endDays));
        return periodDays;
    };
    /**
     * Builds the day label headers for the datepicker columns
     *
     * @return {?}
     */
    IcDatepickerService.prototype.buildDayLabels = function () {
        var /** @type {?} */ labels = [];
        var /** @type {?} */ momentObj = moment().startOf('isoWeek');
        for (var /** @type {?} */ i = 0; i < 7; i++) {
            labels.push(momentObj.format('dd'));
            momentObj.add(1, 'day');
        }
        return labels;
    };
    /**
     * Returns a boolean representing whether the provided date is valid
     *
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    IcDatepickerService.prototype.dateIsValid = function (date, options) {
        var /** @type {?} */ isValid = date.isValid();
        if (isValid && options.minDate) {
            isValid = date.isSameOrAfter(options.minDate, 'day');
        }
        if (isValid && options.maxDate) {
            isValid = date.isSameOrBefore(options.maxDate, 'day');
        }
        return isValid;
    };
    /**
     * Build the provided number of placeholder days
     *
     * @param {?} quantity
     * @return {?}
     */
    IcDatepickerService.prototype.buildPlaceholderDays = function (quantity) {
        var /** @type {?} */ placeholderDays = [];
        for (var /** @type {?} */ i = 0; i < quantity; i++) {
            placeholderDays.push({
                isPlaceholder: true,
                moment: moment()
            });
        }
        return placeholderDays;
    };
    return IcDatepickerService;
}());
IcDatepickerService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
IcDatepickerService.ctorParameters = function () { return []; };

var IcDatepickerComponent = (function () {
    /**
     * IcDatepickerComponent Constructor
     *
     * @param {?} icDatepickerService
     * @param {?} renderer
     * @param {?} element
     */
    function IcDatepickerComponent(icDatepickerService, renderer, element) {
        var _this = this;
        this.icDatepickerService = icDatepickerService;
        this.renderer = renderer;
        this.element = element;
        this.options = {};
        this.dateChange = new EventEmitter();
        this.monthChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.initialised = false;
        this.isDisabled = false;
        // Context variables provided to custom input templates
        this.templateContext = {
            getInputValue: function () {
                return _this.getInputValue();
            }
        };
        this.propagateTouch = function () { };
        this.propagateChange = function () { };
    }
    /**
     * On Component init
     * @return {?}
     */
    IcDatepickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mergedOptions = new IcDatepickerOptions(this.options, this.icDatepickerService);
        // @todo: calculate whether the selected month should display based on min/max dates. Set the initial view appropriately
        this.selectedDay = null;
        this.setCurrentPeriod(moment());
        this.datepickerIsOpen = false;
        this.dayLabels = this.icDatepickerService.buildDayLabels();
        this.yearSelectMode = this.mergedOptions.defaultToYearSelect;
        this.yearOptions = this.buildYearOptions();
        this.toggleMonthToggles(this.currentPeriod);
        this.documentClickEvent = this.renderer.listenGlobal('document', 'click', function (event) {
            event.stopPropagation();
            var /** @type {?} */ closeDatepicker = true;
            var /** @type {?} */ isTarget = _this.element.nativeElement === event.target;
            var /** @type {?} */ containsTarget = _this.element.nativeElement.contains(event.target);
            if (!event.target || isTarget || containsTarget) {
                closeDatepicker = false;
            }
            if (closeDatepicker) {
                _this.closeDatepicker();
            }
        });
        this.initialised = true;
    };
    /**
     * On \@Input() changes
     *
     * @param {?} changes
     * @return {?}
     */
    IcDatepickerComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialised) {
            this.mergedOptions = new IcDatepickerOptions(changes['options'].currentValue, this.icDatepickerService);
            this.setCurrentPeriod(this.currentPeriod);
            if (this.selectedDay) {
                this.selectedDay = this.icDatepickerService.buildDatepickerDay(this.selectedDay.moment, this.mergedOptions, this.selectedDay.moment);
                this.emitModelChange(this.selectedDay);
            }
            this.toggleMonthToggles(this.currentPeriod);
        }
    };
    /**
     * On Component destroy
     * @return {?}
     */
    IcDatepickerComponent.prototype.ngOnDestroy = function () {
        // Remove the body click event to prevent memory leaks
        if (this.documentClickEvent) {
            this.documentClickEvent();
        }
    };
    /**
     * Keyboard events
     *
     * @param {?} event
     * @return {?}
     */
    IcDatepickerComponent.prototype.onKeyboardInput = function (event) {
        var /** @type {?} */ month;
        // Only allow keyboard navigation if the datepicker popup is open
        if (!this.datepickerIsOpen) {
            return;
        }
        switch (event.keyCode) {
            // Esc
            case 27:
                this.closeDatepicker();
                break;
            // Left
            case 37:
                month = this.currentPeriod.clone().subtract(1, 'month');
                if (this.monthIsValid(month)) {
                    this.showMonth('previous');
                }
                break;
            // Right
            case 39:
                month = this.currentPeriod.clone().add(1, 'month');
                if (this.monthIsValid(month)) {
                    this.showMonth('next');
                }
                break;
        }
    };
    /**
     * Update the selected day when the model value is changed externally
     *
     * @param {?} value
     * @return {?}
     */
    IcDatepickerComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (!value) {
            this.selectedDay = null;
            return;
        }
        if (value !== this.selectedDay) {
            if ('string' === typeof value) {
                value = moment(value, this.mergedOptions.stringModelFormat);
            }
            if (value.isValid()) {
                var /** @type {?} */ selectedMoment = this.selectedDay ? this.selectedDay.moment : null;
                value = this.icDatepickerService.buildDatepickerDay(value, this.mergedOptions, selectedMoment);
            }
            else {
                console.warn("Invalid model value " + value + " provided to the IcDatepickerComponent");
                return false;
            }
            var /** @type {?} */ isValid = true;
            if (this.mergedOptions.minDate && value.moment.isBefore(this.mergedOptions.minDate)) {
                isValid = false;
            }
            if (isValid) {
                if (this.mergedOptions.maxDate && value.moment.isAfter(this.mergedOptions.maxDate)) {
                    isValid = false;
                }
            }
            if (!isValid) {
                console.warn('Initial date falls beyond the configured minimum/maximum date');
                if (this.mergedOptions.clearInvalidDates) {
                    this.selectedDay = null;
                    setTimeout(function () {
                        _this.emitModelChange(null);
                    });
                }
                return false;
            }
            this.selectedDay = value;
            this.setCurrentPeriod(value.moment);
            this.toggleMonthToggles(value.moment);
            if (!isValid) {
                console.warn('Date falls beyond the configured minimum/maximum date');
                return false;
            }
        }
    };
    /**
     * Register an On Change callback
     *
     * @param {?} fn
     * @return {?}
     */
    IcDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * Register an On Touch callback
     *
     * @param {?} fn
     * @return {?}
     */
    IcDatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.propagateTouch = fn;
    };
    /**
     * Toggle the disabled state of the component
     *
     * @param {?} isDisabled
     * @return {?}
     */
    IcDatepickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    /**
     * Returns the value for display in the input field
     *
     * @return {?}
     */
    IcDatepickerComponent.prototype.getInputValue = function () {
        var /** @type {?} */ value = '';
        if (this.selectedDay && this.selectedDay.formattedDate) {
            value = this.selectedDay.formattedDate;
        }
        return value;
    };
    /**
     * Toggles the open state of the datepicker
     * @return {?}
     */
    IcDatepickerComponent.prototype.toggleDatepicker = function () {
        this.datepickerIsOpen = !this.datepickerIsOpen;
        var /** @type {?} */ event = this.datepickerIsOpen ? this.opened : this.closed;
        event.emit();
    };
    /**
     * Closes the Datepicker
     * @return {?}
     */
    IcDatepickerComponent.prototype.closeDatepicker = function () {
        this.datepickerIsOpen = false;
        this.closed.emit();
    };
    /**
     * Toggles the displayed month
     *
     * @param {?} direction
     * @return {?}
     */
    IcDatepickerComponent.prototype.showMonth = function (direction) {
        var /** @type {?} */ originalValue = this.currentPeriod.clone();
        var /** @type {?} */ updatedPeriod;
        if ('next' === direction) {
            updatedPeriod = this.currentPeriod.clone().add(1, 'month');
        }
        else {
            updatedPeriod = this.currentPeriod.clone().subtract(1, 'month');
        }
        this.setCurrentPeriod(updatedPeriod);
        this.toggleMonthToggles(updatedPeriod);
        this.monthChange.emit({
            previous: originalValue.startOf('month'),
            value: updatedPeriod.clone().startOf('month')
        });
    };
    /**
     *
     * @param {?} direction
     * @return {?}
     */
    IcDatepickerComponent.prototype.showYears = function (direction) {
        var /** @type {?} */ currentLastYear;
        if ('next' === direction) {
            currentLastYear = this.yearOptions[this.yearOptions.length - 1].moment.add(1, 'year');
        }
        else {
            currentLastYear = this.yearOptions[0].moment.subtract(25, 'years');
        }
        this.yearOptions = this.buildYearOptions(currentLastYear);
    };
    /**
     * Shows the Year selection panel
     * @return {?}
     */
    IcDatepickerComponent.prototype.showYearSelectMode = function () {
        this.yearOptions = this.buildYearOptions();
        this.yearSelectMode = true;
    };
    /**
     * Hides the Year selection panel
     * @return {?}
     */
    IcDatepickerComponent.prototype.hideYearSelectMode = function () {
        this.yearSelectMode = false;
    };
    /**
     * Sets the internally tracked selected day to equal the provided day
     *
     * @param {?} day
     * @param {?=} $event
     * @return {?}
     */
    IcDatepickerComponent.prototype.setSelectedDay = function (day, $event) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        if (this.isDisabled || day.isPlaceholder || day.isDisabled) {
            return false;
        }
        if (this.selectedDay && this.selectedDay.moment && day.moment && day.moment.isSame(this.selectedDay.moment)) {
            return false;
        }
        if (!this.icDatepickerService.dateIsValid(day.moment, this.mergedOptions)) {
            return false;
        }
        this.selectedDay = day;
        if (day.moment) {
            this.setCurrentPeriod(day.moment);
        }
        if (this.mergedOptions.closeOnSelect) {
            this.closeDatepicker();
        }
        this.emitModelChange(day);
    };
    /**
     *
     * @param {?} year
     * @return {?}
     */
    IcDatepickerComponent.prototype.setSelectedYear = function (year) {
        var _this = this;
        var /** @type {?} */ newDate = this.currentPeriod.format('DD/MM') + '/' + year.moment.format('YYYY');
        var /** @type {?} */ newDateMoment = moment(newDate, 'DD/MM/YYYY');
        if (moment.isMoment(this.mergedOptions.minDate) && newDateMoment.isBefore(this.mergedOptions.minDate)) {
            newDateMoment = this.mergedOptions.minDate.clone();
        }
        else if (moment.isMoment(this.mergedOptions.maxDate) && newDateMoment.isAfter(this.mergedOptions.maxDate)) {
            newDateMoment = this.mergedOptions.maxDate.clone();
        }
        this.setCurrentPeriod(newDateMoment);
        this.hideYearSelectMode();
        /*
         Timeout is required to prevent the datepicker from closing when clicking a year due to
         the year element from no longer existing at the point when the element.contains() check
         is evaluated.
         */
        setTimeout(function () {
            _this.yearOptions = _this.buildYearOptions();
        });
    };
    /**
     * Enables or disables the next/previous month toggles based on any provided min or max dates
     *
     * @param {?} updatedPeriod
     * @return {?}
     */
    IcDatepickerComponent.prototype.toggleMonthToggles = function (updatedPeriod) {
        this.previousMonthToggleActive = this.monthIsValid(updatedPeriod.clone().subtract(1, 'month'));
        this.nextMonthToggleActive = this.monthIsValid(updatedPeriod.clone().add(1, 'month'));
    };
    /**
     * Returns whether the provided month is valid based on optionally provided min/max dates
     *
     * @param {?} month
     * @return {?}
     */
    IcDatepickerComponent.prototype.monthIsValid = function (month) {
        var /** @type {?} */ valid = true;
        if (moment.isMoment(this.mergedOptions.minDate)) {
            valid = month.clone()
                .endOf('month')
                .isSameOrAfter(this.mergedOptions
                .minDate
                .clone()
                .startOf('month'));
        }
        if (valid && moment.isMoment(this.mergedOptions.maxDate)) {
            valid = month.clone()
                .startOf('month')
                .isSameOrBefore(this.mergedOptions
                .maxDate
                .clone()
                .startOf('month'));
        }
        return valid;
    };
    /**
     * Sets the currently rendered month period and generates the Day collection within that period
     *
     * @param {?} momentInstance
     * @return {?}
     */
    IcDatepickerComponent.prototype.setCurrentPeriod = function (momentInstance) {
        var /** @type {?} */ selectedDay = null;
        if (this.selectedDay && this.selectedDay.moment) {
            selectedDay = this.selectedDay.moment;
        }
        this.currentPeriod = momentInstance;
        this.periodDays = this.icDatepickerService.buildCalendarMonth(this.currentPeriod.clone(), this.mergedOptions, selectedDay);
        this.toggleMonthToggles(this.currentPeriod);
    };
    /**
     * Builds the list of Year options for the Year select panel
     *
     * @param {?=} year
     * @return {?}
     */
    IcDatepickerComponent.prototype.buildYearOptions = function (year) {
        if (year === void 0) { year = this.currentPeriod.clone().subtract(12, 'years'); }
        var /** @type {?} */ years = [];
        var /** @type {?} */ end = year.clone().add(25, 'years');
        while (year.isBefore(end)) {
            var /** @type {?} */ isDisabled = false;
            var /** @type {?} */ minDate = this.mergedOptions.minDate;
            var /** @type {?} */ maxDate = this.mergedOptions.maxDate;
            if ((minDate && year.isBefore(minDate, 'year')) ||
                (maxDate && year.isAfter(maxDate, 'year'))) {
                isDisabled = true;
            }
            years.push({
                formatted: year.format('YYYY'),
                isDisabled: isDisabled,
                isSelected: year.isSame(this.currentPeriod, 'year'),
                isThisYear: year.isSame(moment(), 'year'),
                moment: year.clone()
            });
            year.add(1, 'year');
        }
        return years;
    };
    /**
     * Emits a model change
     *
     * @param {?} day
     * @return {?}
     */
    IcDatepickerComponent.prototype.emitModelChange = function (day) {
        var /** @type {?} */ originalValue;
        var /** @type {?} */ updatedValue = day;
        switch (this.mergedOptions.modelType) {
            case 'moment':
                originalValue = this.selectedDay ? this.selectedDay.moment : null;
                if (day) {
                    updatedValue = day.moment;
                }
                break;
            case 'IcDatepickerDay':
                originalValue = this.selectedDay;
                if (day) {
                    updatedValue = day;
                }
                break;
            case 'date':
                originalValue = this.selectedDay ? this.selectedDay.moment.toDate() : null;
                if (day) {
                    updatedValue = day.moment.toDate();
                }
                break;
            case 'string':
                originalValue = this.selectedDay ? this.selectedDay.moment.format(this.mergedOptions.stringModelFormat) : null;
                if (day) {
                    updatedValue = day.moment.format(this.mergedOptions.stringModelFormat);
                }
                break;
        }
        // Inform change listeners of the change
        this.propagateChange(updatedValue);
        this.dateChange.emit({
            previous: originalValue,
            value: updatedValue
        });
    };
    return IcDatepickerComponent;
}());
IcDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ic-datepicker',
                template: "<div class=\"ic-datepicker-container\"> <div [style.visibility]=\"datepickerIsOpen ? 'visible': 'hidden'\" class=\"ic-datepicker-underlay\" > &nbsp; </div> <!-- Datepicker toggle --> <div (click)=\"toggleDatepicker()\"> <ng-container *ngTemplateOutlet=\"inputTemplate ? inputTemplate : defaultInput; context: templateContext\" ></ng-container> </div> <!-- Datepicker popup --> <div [style.display]=\"datepickerIsOpen ? 'block' : 'none'\" [ngClass]=\"mergedOptions.position\" class=\"ic-datepicker\"> <div [style.display]=\"yearSelectMode ? 'none' : 'flex'\" class=\"ic-datepicker-header-bar\"> <button (click)=\"showMonth('previous')\" [style.visibility]=\"previousMonthToggleActive ? 'visible' : 'hidden'\" type=\"button\" class=\"cell action previous-month\" > <i [ngClass]=\"mergedOptions.icons.previousMonth.classes\"> {{ mergedOptions.icons.previousMonth.content }} </i> </button> <h3 (click)=\"showYearSelectMode()\" class=\"header-title\"> {{ currentPeriod.format('MMMM YYYY') }} </h3> <button (click)=\"showMonth('next')\" [style.visibility]=\"nextMonthToggleActive ? 'visible' : 'hidden'\" type=\"button\" class=\"cell action next-month\" > <i [ngClass]=\"mergedOptions.icons.nextMonth.classes\"> {{ mergedOptions.icons.nextMonth.content }} </i> </button> </div> <div [style.display]=\"yearSelectMode ? 'flex' : 'none'\" class=\"ic-datepicker-header-bar\"> <h3 class=\"header-title year-title\"> {{ yearOptions[0].formatted }} - {{ yearOptions[yearOptions.length - 1].formatted }} </h3> <button (click)=\"hideYearSelectMode()\" type=\"button\" class=\"cell action close-year-select\"> &times; </button> </div> <div [style.display]=\"yearSelectMode ? 'none' : 'block'\"> <div class=\"ic-datepicker-day-labels\"> <span *ngFor=\"let dayLabel of dayLabels\" class=\"cell day-label\"> {{ dayLabel }} </span> </div> <div class=\"ic-datepicker-dates\"> <button *ngFor=\"let day of periodDays\" (click)=\"setSelectedDay(day, $event)\" [ngClass]=\"day.classes\" [class.today]=\"day.isToday\" [class.selected]=\"day.isSelected\" [class.weekend]=\"day.isWeekend\" [class.placeholder]=\"day.isPlaceholder\" [disabled]=\"isDisabled || day.isPlaceholder || (day.isWeekend && mergedOptions.disableWeekends) || day.isDisabled\" type=\"button\" class=\"cell date\" > <span *ngIf=\"day.isPlaceholder\">&nbsp;</span> <span *ngIf=\"!day.isPlaceholder\"> {{ day.moment.format('D') }} </span> </button> </div> <div *ngIf=\"mergedOptions.showDayQuickOptions\" class=\"quick-options day-quick-options\"> <button *ngFor=\"let option of mergedOptions.dayQuickOptions\" [hidden]=\"option.isDisabled\" (click)=\"setSelectedDay(option.datepickerDay, $event)\" [ngClass]=\"{ selected: (selectedDay && option.date.isSame(selectedDay.moment, 'day')) }\" [disabled]=\"isDisabled\" type=\"button\" class=\"cell quick-option\" > {{ option.label }} </button> </div> </div> <div [style.display]=\"yearSelectMode ? 'block' : 'none'\" class=\"year-list\"> <div class=\"ic-datepicker-dates\"> <button (click)=\"showYears('previous')\" type=\"button\" class=\"cell toggle-years previous\"> <span> <i [ngClass]=\"mergedOptions.icons.previousYears.classes\"> {{ mergedOptions.icons.previousYears.content }} </i> </span> </button> <button *ngFor=\"let year of yearOptions\" (click)=\"setSelectedYear(year)\" [ngClass]=\"{ 'this-year': year.isThisYear, selected: year.isSelected }\" [disabled]=\"year.isDisabled\" type=\"button\" class=\"cell date year\" > {{ year.formatted }} </button> <button (click)=\"showYears('next')\" type=\"button\" class=\"cell toggle-years next\"> <span> <i [ngClass]=\"mergedOptions.icons.nextYears.classes\"> {{ mergedOptions.icons.nextYears.content }} </i> </span> </button> </div> </div> </div> <!-- Default --> <ng-template #defaultInput> <input [value]=\"getInputValue()\" [ngClass]=\"options.inputClasses\" [attr.id]=\"mergedOptions.attrs.id\" [attr.name]=\"mergedOptions.attrs.name\" [attr.placeholder]=\"mergedOptions.attrs.placeholder\" [attr.tabindex]=\"mergedOptions.attrs.tabindex\" [attr.readonly]=\"mergedOptions.attrs.readonly\" type=\"text\" > </ng-template> </div> ",
                styles: [".ic-datepicker-container { position: relative; } @media (max-width: 480px) { .ic-datepicker-underlay { position: fixed; top: 0; left: 0; height: 100vh; width: 100vh; background: rgba(0, 0, 0, 0.3); } } .ic-datepicker { position: absolute; width: 270px; z-index: 1000; -webkit-box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.3); -moz-box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.3); box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.3); } @media (max-width: 480px) { .ic-datepicker { position: fixed; bottom: 0; left: 0; transform-origin: 0 100%; width: 100%; width: 100vw; } } @media only screen and (min-width: 481px) { .ic-datepicker.top { transform-origin: 0 100%; bottom: 48px; } .ic-datepicker.bottom { top: 48px; } } .ic-datepicker .cell { user-select: none; width: calc(100% / 7); font-size: 14px; height: 38px; display: inline-block; text-align: center; font-weight: 300; border-width: 1px; border-style: solid; outline: none; box-sizing: border-box; } @media (max-width: 480px) { .ic-datepicker .cell { height: 44px; height: calc(100vw / 7); } } .ic-datepicker .cell[disabled]:hover { cursor: not-allowed; } .ic-datepicker .cell.year { width: calc(100% / 5); } .ic-datepicker .ic-datepicker-header-bar { display: flex; align-items: center; } .ic-datepicker .ic-datepicker-header-bar .action { background: transparent; border: none; outline: none; padding: 0; display: flex; justify-content: center; align-items: center; } .ic-datepicker .ic-datepicker-header-bar .header-title { text-align: center; text-transform: uppercase; margin: 0; padding-top: 4px; font-size: 15px; font-weight: 400; line-height: 34px; width: calc((100% / 7) * 5); -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .ic-datepicker .ic-datepicker-header-bar .header-title.year-title { margin-left: calc(100% / 7); } .ic-datepicker-container .ic-datepicker .ic-datepicker-header-bar .header-title:not(.year-title):hover, .ic-datepicker-container .ic-datepicker .ic-datepicker-header-bar .cell.action:hover { cursor: pointer; } .ic-datepicker .ic-datepicker-year-select-options .close-year-select { display: block; } .ic-datepicker .ic-datepicker-day-labels .day-label { line-height: 38px; font-size: 12px; font-weight: 300; text-transform: uppercase; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } ic-datepicker .ic-datepicker-dates .date { padding-top: 0; padding-bottom: 0; } .ic-datepicker .ic-datepicker-dates .date span { display: flex; align-content: center; justify-content: center; line-height: 34px; } .ic-datepicker .quick-options { text-align: center; } .ic-datepicker .quick-options .quick-option { width: calc(100% / 2); } .ic-datepicker .year-list .toggle-years { width: 100%; font-weight: 300; outline: none; display: flex; justify-content: center; align-items: center; } .ic-datepicker .year-list .toggle-years:hover { cursor: pointer; } .ic-datepicker .chevron::before { border-style: solid; border-width: 2px 2px 0 0; content: ''; display: inline-block; height: 10px; position: relative; top: 6px; transform: rotate(-45deg); vertical-align: top; width: 10px; } .ic-datepicker .chevron.chevron-up::before { position: relative; top: 8px; } .ic-datepicker .chevron.chevron-right::before { left: -2px; transform: rotate(45deg); } .ic-datepicker .chevron.chevron-down::before { position: relative; top: 3px; transform: rotate(135deg); } .ic-datepicker .chevron.chevron-left::before { left: 3px; transform: rotate(-135deg); } "],
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return IcDatepickerComponent; }),
                        multi: true
                    }
                ],
            },] },
];
/**
 * @nocollapse
 */
IcDatepickerComponent.ctorParameters = function () { return [
    { type: IcDatepickerService, decorators: [{ type: Inject, args: [IcDatepickerService,] },] },
    { type: Renderer, decorators: [{ type: Inject, args: [Renderer,] },] },
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] },] },
]; };
IcDatepickerComponent.propDecorators = {
    'inputTemplate': [{ type: Input },],
    'options': [{ type: Input },],
    'dateChange': [{ type: Output },],
    'monthChange': [{ type: Output },],
    'opened': [{ type: Output },],
    'closed': [{ type: Output },],
    'onKeyboardInput': [{ type: HostListener, args: ['window:keydown', ['$event'],] },],
};

var IcDatepickerModule = (function () {
    function IcDatepickerModule() {
    }
    /**
     * @return {?}
     */
    IcDatepickerModule.forRoot = function () {
        return {
            ngModule: IcDatepickerModule,
            providers: [IcDatepickerService]
        };
    };
    return IcDatepickerModule;
}());
IcDatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    IcDatepickerComponent,
                ],
                exports: [
                    IcDatepickerComponent,
                ]
            },] },
];
/**
 * @nocollapse
 */
IcDatepickerModule.ctorParameters = function () { return []; };

export { IcDatepickerModule, IcDatepickerComponent, defaultDayQuickOptions, IcDatepickerOptions };
