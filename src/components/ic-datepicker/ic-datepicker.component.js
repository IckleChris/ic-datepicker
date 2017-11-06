"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment_1 = require("moment");
var ic_datepicker_options_1 = require("../../models/ic-datepicker-options");
var ic_datepicker_service_1 = require("../../services/ic-datepicker.service");
var IcDatepickerComponent = IcDatepickerComponent_1 = (function () {
    /**
     * IcDatepickerComponent Constructor
     *
     * @param icDatepickerService
     * @param renderer
     * @param element
     */
    function IcDatepickerComponent(icDatepickerService, renderer, element) {
        this.icDatepickerService = icDatepickerService;
        this.renderer = renderer;
        this.element = element;
        this.options = {};
        this.dateChange = new core_1.EventEmitter();
        this.monthChange = new core_1.EventEmitter();
        this.opened = new core_1.EventEmitter();
        this.closed = new core_1.EventEmitter();
        this.initialised = false;
        this.isDisabled = false;
        this.propagateTouch = function () { };
        this.propagateChange = function () { };
    }
    /**
     * On Component init
     */
    IcDatepickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mergedOptions = new ic_datepicker_options_1.IcDatepickerOptions(this.options, this.icDatepickerService);
        // @todo: calculate whether the selected month should display based on min/max dates. Set the initial view appropriately
        this.selectedDay = null;
        this.setCurrentPeriod(moment_1["default"]());
        this.datepickerIsOpen = false;
        this.dayLabels = this.icDatepickerService.buildDayLabels();
        this.yearSelectMode = this.mergedOptions.defaultToYearSelect;
        this.yearOptions = this.buildYearOptions();
        this.toggleMonthToggles(this.currentPeriod);
        this.documentClickEvent = this.renderer.listenGlobal('document', 'click', function (event) {
            event.stopPropagation();
            var closeDatepicker = true;
            var isTarget = _this.element.nativeElement === event.target;
            var containsTarget = _this.element.nativeElement.contains(event.target);
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
     * On @Input() changes
     *
     * @param changes
     */
    IcDatepickerComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialised) {
            this.mergedOptions = new ic_datepicker_options_1.IcDatepickerOptions(changes['options'].currentValue, this.icDatepickerService);
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
     * @param event
     * @returns {boolean}
     */
    IcDatepickerComponent.prototype.onKeyboardInput = function (event) {
        switch (event.keyCode) {
            // Esc
            case 27:
                this.closeDatepicker();
                break;
            // Left
            case 37:
                this.showMonth('previous');
                break;
            // Right
            case 39:
                this.showMonth('next');
                break;
        }
    };
    /**
     * Update the selected day when the model value is changed externally
     *
     * @param value
     */
    IcDatepickerComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (!value) {
            this.selectedDay = null;
            return;
        }
        if (value !== this.selectedDay) {
            if ('string' === typeof value) {
                value = moment_1["default"](value, this.mergedOptions.stringModelFormat);
            }
            if (value.isValid()) {
                var selectedMoment = this.selectedDay ? this.selectedDay.moment : null;
                value = this.icDatepickerService.buildDatepickerDay(value, this.mergedOptions, selectedMoment);
            }
            else {
                console.warn("Invalid model value " + value + " provided to the IcDatepickerComponent");
                return false;
            }
            var isValid = true;
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
     * @param fn
     */
    IcDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * Register an On Touch callback
     *
     * @param fn
     */
    IcDatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.propagateTouch = fn;
    };
    /**
     * Toggle the disabled state of the component
     *
     * @param isDisabled
     */
    IcDatepickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    /**
     * Returns the value for display in the input field
     *
     * @returns {string}
     */
    IcDatepickerComponent.prototype.getInputValue = function () {
        var value = '';
        if (this.selectedDay && this.selectedDay.formattedDate) {
            value = this.selectedDay.formattedDate;
        }
        return value;
    };
    /**
     * Toggles the open state of the datepicker
     */
    IcDatepickerComponent.prototype.toggleDatepicker = function () {
        this.datepickerIsOpen = !this.datepickerIsOpen;
        var event = this.datepickerIsOpen ? this.opened : this.closed;
        event.emit();
    };
    /**
     * Closes the Datepicker
     */
    IcDatepickerComponent.prototype.closeDatepicker = function () {
        this.datepickerIsOpen = false;
        this.closed.emit();
    };
    /**
     * Toggles the displayed month
     *
     * @param direction
     */
    IcDatepickerComponent.prototype.showMonth = function (direction) {
        var originalValue = this.currentPeriod.clone();
        var updatedPeriod;
        if ('next' === direction) {
            updatedPeriod = this.currentPeriod.clone().add(1, 'month');
        }
        else {
            updatedPeriod = this.currentPeriod.clone().subtract(1, 'month');
        }
        this.toggleMonthToggles(updatedPeriod);
        this.setCurrentPeriod(updatedPeriod);
        this.monthChange.emit({
            previous: originalValue.startOf('month'),
            value: updatedPeriod.clone().startOf('month')
        });
    };
    /**
     *
     * @param direction
     */
    IcDatepickerComponent.prototype.showYears = function (direction) {
        var currentLastYear;
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
     */
    IcDatepickerComponent.prototype.showYearSelectMode = function () {
        this.yearOptions = this.buildYearOptions();
        this.yearSelectMode = true;
    };
    /**
     * Hides the Year selection panel
     */
    IcDatepickerComponent.prototype.hideYearSelectMode = function () {
        this.yearSelectMode = false;
    };
    /**
     * Sets the internally tracked selected day to equal the provided day
     *
     * @param day
     * @param $event
     * @returns {boolean}
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
     * @param year
     */
    IcDatepickerComponent.prototype.setSelectedYear = function (year) {
        var _this = this;
        var newDate = this.currentPeriod.format('DD/MM') + '/' + year.moment.format('YYYY');
        this.setCurrentPeriod(moment_1["default"](newDate, 'DD/MM/YYYY'));
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
     * @param updatedPeriod
     */
    IcDatepickerComponent.prototype.toggleMonthToggles = function (updatedPeriod) {
        if (!this.mergedOptions.minDate) {
            this.previousMonthToggleActive = true;
        }
        else {
            this.previousMonthToggleActive = updatedPeriod.clone()
                .subtract(1, 'month')
                .startOf('month')
                .isSameOrAfter(this.mergedOptions
                .minDate
                .clone()
                .startOf('month'));
        }
        if (!this.mergedOptions.maxDate) {
            this.nextMonthToggleActive = true;
        }
        else {
            this.nextMonthToggleActive = updatedPeriod.clone()
                .add(1, 'month')
                .startOf('month')
                .isSameOrBefore(this.mergedOptions
                .maxDate
                .clone()
                .startOf('month'));
        }
    };
    /**
     * Sets the currently rendered month period and generates the Day collection within that period
     *
     * @param momentInstance
     */
    IcDatepickerComponent.prototype.setCurrentPeriod = function (momentInstance) {
        var selectedDay = null;
        if (this.selectedDay && this.selectedDay.moment) {
            selectedDay = this.selectedDay.moment;
        }
        this.currentPeriod = momentInstance;
        this.periodDays = this.icDatepickerService.buildCalendarMonth(this.currentPeriod.clone(), this.mergedOptions, selectedDay);
    };
    /**
     * Builds the list of Year options for the Year select panel
     *
     * @param year
     * @returns {IcDatepickerYear[]}
     */
    IcDatepickerComponent.prototype.buildYearOptions = function (year) {
        if (year === void 0) { year = this.currentPeriod.clone().subtract(12, 'years'); }
        var years = [];
        var end = year.clone().add(25, 'years');
        while (year.isBefore(end)) {
            var isDisabled = false;
            var minDate = this.mergedOptions.minDate;
            var maxDate = this.mergedOptions.maxDate;
            if ((minDate && year.isBefore(minDate, 'year')) ||
                (maxDate && year.isAfter(maxDate, 'year'))) {
                isDisabled = true;
            }
            years.push({
                formatted: year.format('YYYY'),
                isDisabled: isDisabled,
                isSelected: year.isSame(this.currentPeriod, 'year'),
                isThisYear: year.isSame(moment_1["default"](), 'year'),
                moment: year.clone()
            });
            year.add(1, 'year');
        }
        return years;
    };
    /**
     * Emits a model change
     *
     * @param day
     */
    IcDatepickerComponent.prototype.emitModelChange = function (day) {
        var originalValue;
        var updatedValue = day;
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
__decorate([
    core_1.Input()
], IcDatepickerComponent.prototype, "options");
__decorate([
    core_1.Output()
], IcDatepickerComponent.prototype, "dateChange");
__decorate([
    core_1.Output()
], IcDatepickerComponent.prototype, "monthChange");
__decorate([
    core_1.Output()
], IcDatepickerComponent.prototype, "opened");
__decorate([
    core_1.Output()
], IcDatepickerComponent.prototype, "closed");
__decorate([
    core_1.HostListener('keydown', ['$event'])
], IcDatepickerComponent.prototype, "onKeyboardInput");
IcDatepickerComponent = IcDatepickerComponent_1 = __decorate([
    core_1.Component({
        selector: 'ic-datepicker',
        templateUrl: './ic-datepicker.component.html',
        styleUrls: [
            './ic-datepicker.component.scss'
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return IcDatepickerComponent_1; }),
                multi: true
            }
        ]
    }),
    __param(0, core_1.Inject(ic_datepicker_service_1.IcDatepickerService)),
    __param(1, core_1.Inject(core_1.Renderer)),
    __param(2, core_1.Inject(core_1.ElementRef))
], IcDatepickerComponent);
exports.IcDatepickerComponent = IcDatepickerComponent;
var IcDatepickerComponent_1;
