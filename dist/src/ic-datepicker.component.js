var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, HostListener, Input, forwardRef, ViewEncapsulation, Renderer, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment';
import { IcDatepickerOptions } from './models/ic-datepicker-options';
import { IcDatepickerService } from './services/ic-datepicker.service';
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
        this.dateChange = new EventEmitter();
        this.monthChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.propagateTouch = function () { };
        this.propagateChange = function () { };
        this.initialised = false;
        this.isDisabled = false;
    }
    /**
     * On Component init
     */
    IcDatepickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mergedOptions = new IcDatepickerOptions(this.options, this.icDatepickerService);
        // @todo: calculate whether the selected month should display based on min/max dates. Set the initial view appropriately
        this.selectedDay = null;
        this.setCurrentPeriod(Moment());
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
                value = Moment(value, this.mergedOptions.stringModelFormat);
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
        this.setCurrentPeriod(Moment(newDate, 'DD/MM/YYYY'));
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
                isThisYear: year.isSame(Moment(), 'year'),
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
    Input(),
    __metadata("design:type", Object)
], IcDatepickerComponent.prototype, "options", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], IcDatepickerComponent.prototype, "dateChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], IcDatepickerComponent.prototype, "monthChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], IcDatepickerComponent.prototype, "opened", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], IcDatepickerComponent.prototype, "closed", void 0);
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], IcDatepickerComponent.prototype, "onKeyboardInput", null);
IcDatepickerComponent = IcDatepickerComponent_1 = __decorate([
    Component({
        selector: 'ic-datepicker',
        encapsulation: ViewEncapsulation.None,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(function () { return IcDatepickerComponent_1; }),
                multi: true
            }
        ],
        template: "\n    <div class=\"ic-datepicker-container\">\n      <input \n        [value]=\"getInputValue()\" \n        [ngClass]=\"options.inputClasses\" \n        (click)=\"toggleDatepicker()\"\n        [attr.id]=\"mergedOptions.attrs.id\"\n        [attr.name]=\"mergedOptions.attrs.name\"\n        [attr.placeholder]=\"mergedOptions.attrs.placeholder\"\n        [attr.tabindex]=\"mergedOptions.attrs.tabindex\"\n        [attr.readonly]=\"mergedOptions.attrs.readonly\"\n        type=\"text\"\n      >\n\n      <div [style.display]=\"datepickerIsOpen ? 'block' : 'none'\" [ngClass]=\"mergedOptions.position\" class=\"ic-datepicker\">\n        <div [style.display]=\"yearSelectMode ? 'none' : 'flex'\" class=\"ic-datepicker-header-bar\">\n          <button \n            (click)=\"showMonth('previous')\"\n            [style.visibility]=\"previousMonthToggleActive ? 'visible' : 'hidden'\"\n            type=\"button\" \n            class=\"cell action previous-month\"\n          >\n            <i [ngClass]=\"mergedOptions.icons.previousMonth.classes\">\n              {{ mergedOptions.icons.previousMonth.content }}\n            </i>\n          </button>\n\n          <h3 (click)=\"showYearSelectMode()\" class=\"header-title\">\n            {{ currentPeriod.format('MMMM YYYY') }}\n          </h3>\n\n          <button\n            (click)=\"showMonth('next')\"\n            [style.visibility]=\"nextMonthToggleActive ? 'visible' : 'hidden'\"\n            type=\"button\" \n            class=\"cell action next-month\"\n            >\n            <i [ngClass]=\"mergedOptions.icons.nextMonth.classes\">\n              {{ mergedOptions.icons.nextMonth.content }}\n            </i>\n          </button>          \n        </div>\n        \n        <div [style.display]=\"yearSelectMode ? 'flex' : 'none'\" class=\"ic-datepicker-header-bar\">\n          <h3 class=\"header-title year-title\">\n            {{ yearOptions[0].formatted }} - {{ yearOptions[yearOptions.length - 1].formatted }}\n          </h3>\n          \n          <button (click)=\"hideYearSelectMode()\" type=\"button\" class=\"cell action close-year-select\">\n            &times;\n          </button>\n        </div>\n\n        <div [style.display]=\"yearSelectMode ? 'none' : 'block'\">\n          <div class=\"ic-datepicker-day-labels\">\n            <span *ngFor=\"let dayLabel of dayLabels\" class=\"cell day-label\">\n              {{ dayLabel }}\n            </span>\n          </div>\n\n          <div class=\"ic-datepicker-dates\">\n            <button \n              *ngFor=\"let day of periodDays\" \n              (click)=\"setSelectedDay(day, $event)\" \n              [ngClass]=\"day.classes\"\n              [class.today]=\"day.isToday\"\n              [class.selected]=\"day.isSelected\"\n              [class.weekend]=\"day.isWeekend\"\n              [class.placeholder]=\"day.isPlaceholder\"\n              [disabled]=\"isDisabled || day.isPlaceholder || (day.isWeekend && mergedOptions.disableWeekends) || day.isDisabled\" \n              type=\"button\" \n              class=\"cell date\"\n            >\n              <span *ngIf=\"day.isPlaceholder\">&nbsp;</span>\n              <span *ngIf=\"!day.isPlaceholder\">\n                {{ day.moment.format('D') }}\n              </span>\n            </button>\n          </div>\n          \n          <div *ngIf=\"mergedOptions.showDayQuickOptions\" class=\"quick-options day-quick-options\">\n            <button \n              *ngFor=\"let option of mergedOptions.dayQuickOptions\"\n              [hidden]=\"option.isDisabled\"                \n              (click)=\"setSelectedDay(option.datepickerDay, $event)\"\n              [ngClass]=\"{ selected: (selectedDay && option.date.isSame(selectedDay.moment, 'day')) }\"\n              [disabled]=\"isDisabled\"\n              type=\"button\"\n              class=\"cell quick-option\"\n            >\n              {{ option.label }}\n            </button>\n          </div>\n        </div>\n\n        <div [style.display]=\"yearSelectMode ? 'block' : 'none'\" class=\"year-list\">\n          <div class=\"ic-datepicker-dates\">\n            <button (click)=\"showYears('previous')\" type=\"button\" class=\"cell toggle-years previous\">\n              <span>\n                <i [ngClass]=\"mergedOptions.icons.previousYears.classes\">\n                  {{ mergedOptions.icons.previousYears.content }}\n                </i>            \n              </span>\n            </button>\n            \n            <button \n              *ngFor=\"let year of yearOptions\"\n              (click)=\"setSelectedYear(year)\"\n              [ngClass]=\"{ 'this-year': year.isThisYear, selected: year.isSelected }\" \n              [disabled]=\"year.isDisabled\"\n              type=\"button\"\n              class=\"cell date year\"\n            >\n              {{ year.formatted }}              \n            </button>\n            \n            <button (click)=\"showYears('next')\" type=\"button\" class=\"cell toggle-years next\">\n              <span>\n                <i [ngClass]=\"mergedOptions.icons.nextYears.classes\">\n                  {{ mergedOptions.icons.nextYears.content }}\n                </i>            \n              </span>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        styles: ["\n    .ic-datepicker-container {\n      position: relative;\n    }\n    \n    .ic-datepicker-container > input[readonly] {\n      background: #ffffff;\n    }\n    \n    .ic-datepicker {\n      position: absolute;\n      background: #ffffff;\n      width: 270px;\n      z-index: 1000;\n      -webkit-box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);\n      -moz-box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);\n      box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);\n    }\n    \n    .ic-datepicker.top {\n      transform-origin: 0 100%;\n      bottom: 48px;\n    }\n    \n    .ic-datepicker.bottom {\n      top: 48px;\n    }\n    \n    .ic-datepicker .cell {\n      width: calc(100% / 7);\n      font-size: 14px;\n      height: 38px;\n      display: inline-block;\n      text-align: center;\n      background: #ffffff;\n      font-weight: 300;\n      color: #484848;\n      border: 1px solid #f0f0f0;\n      outline: none;\n      box-sizing: border-box;\n    }\n    \n    .ic-datepicker .cell.selected {\n      background: #E16756;\n      border: 1px solid #E17656;\n      color: #ffffff;\n    }\n    \n    .ic-datepicker .cell:not([disabled]):not(.selected):not(.day-label):hover {\n      background: #f0f0f0;\n      cursor: pointer;\n    }\n    \n    .ic-datepicker .cell.year {\n      width: calc(100% / 5);\n    }\n    \n    .ic-datepicker .ic-datepicker-header-bar {\n      display: flex;\n      align-items: center;\n      background: #E16756;\n      color: #ffffff;\n    }\n    \n    .ic-datepicker .ic-datepicker-header-bar .action {\n      background: transparent;\n      color: #ffffff;\n      border: none;\n      outline: none;\n      padding: 0;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    \n    .ic-datepicker .ic-datepicker-header-bar .header-title {\n      text-align: center;\n      text-transform: uppercase;\n      margin: 0;\n      padding-top: 4px;\n      font-size: 15px;\n      font-weight: 400;\n      line-height: 34px;\n      width: calc((100% / 7) * 5);\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n    }\n    \n    .ic-datepicker .ic-datepicker-header-bar .header-title.year-title {\n      margin-left: calc(100% / 7); \n    }\n    \n    .ic-datepicker-container .ic-datepicker .ic-datepicker-header-bar .header-title:not(.year-title):hover,\n    .ic-datepicker-container .ic-datepicker .ic-datepicker-header-bar .cell.action:hover {\n      background: #ca5c4d;\n      cursor: pointer;\n    }\n    \n    .ic-datepicker .ic-datepicker-year-select-options .close-year-select {\n      display: block;\n    }\n    \n    .ic-datepicker .ic-datepicker-day-labels .day-label {\n      line-height: 38px;\n      font-size: 12px;\n      font-weight: 300;\n      text-transform: uppercase;\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n    }\n    \n    ic-datepicker .ic-datepicker-dates .date {\n      padding-top: 0;\n      padding-bottom: 0;\n    }\n    \n    .ic-datepicker .ic-datepicker-dates .date span {\n      display: flex;\n      align-content: center;\n      justify-content: center;\n      line-height: 38px;\n    }\n    \n    .ic-datepicker .date.today:not(.selected),\n    .ic-datepicker .date.this-year:not(.selected) {\n      color: #E16756;\n    }\n    \n    .ic-datepicker .ic-datepicker-dates .date.placeholder {\n      background: #fafafa;\n    }\n    \n    .ic-datepicker .ic-datepicker-dates .date[disabled]:not(.placeholder) {\n      background: #f3f3f3;\n      color: #909090;\n    }\n    \n    .ic-datepicker .quick-options {\n      text-align: center;\n    }\n    \n    .ic-datepicker .quick-options .quick-option {\n      width: calc(100% / 2);\n    }\n    \n    .ic-datepicker .year-list .toggle-years {\n      width: 100%;\n      background: #f0f0f0;\n      font-weight: 300;\n      color: #484848;\n      border: 1px solid #f0f0f0;\n      outline: none;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    \n    .ic-datepicker .year-list .toggle-years:hover {\n      background: #ececec;\n      cursor: pointer;\n    }\n    \n    /* Chevrons - Credit Jonathan Neal (https://codepen.io/jonneal/pen/kptBs) */\n    .ic-datepicker .chevron {\n      box-sizing: content-box;    \n    }\n    \n    .ic-datepicker .chevron::before {\n      border-style: solid;\n      border-width: 0.25em 0.25em 0 0;\n      content: '';\n      display: inline-block;\n      height: 0.45em;\n      transform: rotate(-45deg);\n      width: 0.45em;\n    }\n    \n    .ic-datepicker .chevron.chevron-up::before {\n      position: relative;\n      top: 0.2em; \n    }\n    \n    .ic-datepicker .chevron.chevron-right::before {\n      left: 0;\n      transform: rotate(45deg);\n    }\n    \n    .ic-datepicker .chevron.chevron-down::before {\n      position: relative;\n      bottom: 0.2em; \n      transform: rotate(135deg);\n    }\n    \n    .ic-datepicker .chevron.chevron-left::before {\n      left: 0.25em;\n      transform: rotate(-135deg);\n    }\n  "]
    }),
    __param(0, Inject(IcDatepickerService)),
    __param(1, Inject(Renderer)),
    __param(2, Inject(ElementRef)),
    __metadata("design:paramtypes", [IcDatepickerService,
        Renderer,
        ElementRef])
], IcDatepickerComponent);
export { IcDatepickerComponent };
var IcDatepickerComponent_1;
//# sourceMappingURL=ic-datepicker.component.js.map