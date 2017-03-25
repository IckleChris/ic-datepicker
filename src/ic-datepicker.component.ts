import {
  Component, HostListener, Input, forwardRef, OnInit, ViewEncapsulation, Renderer,
  OnDestroy, ElementRef, Output, EventEmitter, Inject, OnChanges, SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment';

import { IcDatepickerOptions } from './models/ic-datepicker-options';
import { IcDatepickerDay } from './interfaces/ic-datepicker-day';
import { IcDatepickerOptionsInterface } from './interfaces/ic-datepicker-options';
import { IcDatepickerService } from './services/ic-datepicker.service';
import { IcDatepickerYear } from './interfaces/ic-datepicker-year';

@Component({
  selector: 'ic-datepicker',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IcDatepickerComponent),
      multi: true
    }
  ],
  template: `
    <div class="ic-datepicker-container">
      <input 
        [value]="getInputValue()" 
        [ngClass]="options.inputClasses" 
        (click)="toggleDatepicker()"
        [attr.id]="mergedOptions.attrs.id"
        [attr.name]="mergedOptions.attrs.name"
        [attr.placeholder]="mergedOptions.attrs.placeholder"
        [attr.tabindex]="mergedOptions.attrs.tabindex"
        [attr.readonly]="mergedOptions.attrs.readonly"
        type="text"
      >

      <div [style.display]="datepickerIsOpen ? 'block' : 'none'" [ngClass]="mergedOptions.position" class="ic-datepicker">
        <div [style.display]="yearSelectMode ? 'none' : 'flex'" class="ic-datepicker-header-bar">
          <button 
            (click)="showMonth('previous')"
            [style.visibility]="previousMonthToggleActive ? 'visible' : 'hidden'"
            type="button" 
            class="cell action previous-month"
          >
            <i [ngClass]="mergedOptions.icons.previousMonth.classes">
              {{ mergedOptions.icons.previousMonth.content }}
            </i>
          </button>

          <h3 (click)="showYearSelectMode()" class="header-title">
            {{ currentPeriod.format('MMMM YYYY') }}
          </h3>

          <button
            (click)="showMonth('next')"
            [style.visibility]="nextMonthToggleActive ? 'visible' : 'hidden'"
            type="button" 
            class="cell action next-month"
            >
            <i [ngClass]="mergedOptions.icons.nextMonth.classes">
              {{ mergedOptions.icons.nextMonth.content }}
            </i>
          </button>          
        </div>
        
        <div [style.display]="yearSelectMode ? 'flex' : 'none'" class="ic-datepicker-header-bar">
          <h3 class="header-title year-title">
            {{ yearOptions[0].formatted }} - {{ yearOptions[yearOptions.length - 1].formatted }}
          </h3>
          
          <button (click)="hideYearSelectMode()" type="button" class="cell action close-year-select">
            &times;
          </button>
        </div>

        <div [style.display]="yearSelectMode ? 'none' : 'block'">
          <div class="ic-datepicker-day-labels">
            <span *ngFor="let dayLabel of dayLabels" class="cell day-label">
              {{ dayLabel }}
            </span>
          </div>

          <div class="ic-datepicker-dates">
            <button 
              *ngFor="let day of periodDays" 
              (click)="setSelectedDay(day, $event)" 
              [ngClass]="day.classes"
              [class.today]="day.isToday"
              [class.selected]="day.isSelected"
              [class.weekend]="day.isWeekend"
              [class.placeholder]="day.isPlaceholder"
              [disabled]="day.isPlaceholder || (day.isWeekend && mergedOptions.disableWeekends) || day.isDisabled" 
              type="button" 
              class="cell date"
            >
              <span *ngIf="day.isPlaceholder">&nbsp;</span>
              <span *ngIf="!day.isPlaceholder">
                {{ day.moment.format('D') }}
              </span>
            </button>
          </div>
          
          <div *ngIf="mergedOptions.showDayQuickOptions" class="quick-options day-quick-options">
            <button 
              *ngFor="let option of mergedOptions.dayQuickOptions"
              [hidden]="option.isDisabled"                
              (click)="setSelectedDay(option.datepickerDay, $event)"
              [ngClass]="{ selected: (selectedDay && option.date.isSame(selectedDay.moment, 'day')) }"
              type="button"
              class="cell quick-option"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div [style.display]="yearSelectMode ? 'block' : 'none'" class="year-list">
          <div class="ic-datepicker-dates">
            <button (click)="showYears('previous')" type="button" class="cell toggle-years previous">
              <span>
                <i [ngClass]="mergedOptions.icons.previousYears.classes">
                  {{ mergedOptions.icons.previousYears.content }}
                </i>            
              </span>
            </button>
            
            <button 
              *ngFor="let year of yearOptions"
              (click)="setSelectedYear(year)"
              [ngClass]="{ 'this-year': year.isThisYear, selected: year.isSelected }" 
              [disabled]="year.isDisabled"
              type="button"
              class="cell date year"
            >
              {{ year.formatted }}              
            </button>
            
            <button (click)="showYears('next')" type="button" class="cell toggle-years next">
              <span>
                <i [ngClass]="mergedOptions.icons.nextYears.classes">
                  {{ mergedOptions.icons.nextYears.content }}
                </i>            
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ic-datepicker-container {
      position: relative;
    }
    
    .ic-datepicker-container > input[readonly] {
      background: #ffffff;
    }
    
    .ic-datepicker {
      position: absolute;
      background: #ffffff;
      width: 270px;
      z-index: 1000;
      -webkit-box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);
      -moz-box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);
      box-shadow: 0 0 10px 2px rgba(50, 50, 50, 0.25);
    }
    
    .ic-datepicker.top {
      transform-origin: 0 100%;
      bottom: 48px;
    }
    
    .ic-datepicker.bottom {
      top: 48px;
    }
    
    .ic-datepicker .cell {
      width: calc(100% / 7);
      font-size: 14px;
      height: 38px;
      display: inline-block;
      text-align: center;
      background: #ffffff;
      font-weight: 300;
      color: #484848;
      border: 1px solid #f0f0f0;
      outline: none;
      box-sizing: border-box;
    }
    
    .ic-datepicker .cell.selected {
      background: #E16756;
      border: 1px solid #E17656;
      color: #ffffff;
    }
    
    .ic-datepicker .cell:not([disabled]):not(.selected):not(.day-label):hover {
      background: #f0f0f0;
      cursor: pointer;
    }
    
    .ic-datepicker .cell.year {
      width: calc(100% / 5);
    }
    
    .ic-datepicker .ic-datepicker-header-bar {
      display: flex;
      align-items: center;
      background: #E16756;
      color: #ffffff;
    }
    
    .ic-datepicker .ic-datepicker-header-bar .action {
      background: transparent;
      color: #ffffff;
      border: none;
      outline: none;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .ic-datepicker .ic-datepicker-header-bar .header-title {
      text-align: center;
      text-transform: uppercase;
      margin: 0;
      padding-top: 4px;
      font-size: 15px;
      font-weight: 400;
      line-height: 34px;
      width: calc((100% / 7) * 5);
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    .ic-datepicker .ic-datepicker-header-bar .header-title.year-title {
      margin-left: calc(100% / 7); 
    }
    
    .ic-datepicker-container .ic-datepicker .ic-datepicker-header-bar .header-title:not(.year-title):hover,
    .ic-datepicker-container .ic-datepicker .ic-datepicker-header-bar .cell.action:hover {
      background: #ca5c4d;
      cursor: pointer;
    }
    
    .ic-datepicker .ic-datepicker-year-select-options .close-year-select {
      display: block;
    }
    
    .ic-datepicker .ic-datepicker-day-labels .day-label {
      line-height: 38px;
      font-size: 12px;
      font-weight: 300;
      text-transform: uppercase;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    ic-datepicker .ic-datepicker-dates .date {
      padding-top: 0;
      padding-bottom: 0;
    }
    
    .ic-datepicker .ic-datepicker-dates .date span {
      display: flex;
      align-content: center;
      justify-content: center;
      line-height: 38px;
    }
    
    .ic-datepicker .date.today:not(.selected),
    .ic-datepicker .date.this-year:not(.selected) {
      color: #E16756;
    }
    
    .ic-datepicker .ic-datepicker-dates .date.placeholder {
      background: #fafafa;
    }
    
    .ic-datepicker .ic-datepicker-dates .date[disabled]:not(.placeholder) {
      background: #f3f3f3;
      color: #909090;
    }
    
    .ic-datepicker .quick-options {
      text-align: center;
    }
    
    .ic-datepicker .quick-options .quick-option {
      width: calc(100% / 2);
    }
    
    .ic-datepicker .year-list .toggle-years {
      width: 100%;
      background: #f0f0f0;
      font-weight: 300;
      color: #484848;
      border: 1px solid #f0f0f0;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .ic-datepicker .year-list .toggle-years:hover {
      background: #ececec;
      cursor: pointer;
    }
    
    /* Chevrons - Credit Jonathan Neal (https://codepen.io/jonneal/pen/kptBs) */
    .ic-datepicker .chevron {
      box-sizing: content-box;    
    }
    
    .ic-datepicker .chevron::before {
      border-style: solid;
      border-width: 0.25em 0.25em 0 0;
      content: '';
      display: inline-block;
      height: 0.45em;
      transform: rotate(-45deg);
      width: 0.45em;
    }
    
    .ic-datepicker .chevron.chevron-up::before {
      position: relative;
      top: 0.2em; 
    }
    
    .ic-datepicker .chevron.chevron-right::before {
      left: 0;
      transform: rotate(45deg);
    }
    
    .ic-datepicker .chevron.chevron-down::before {
      position: relative;
      bottom: 0.2em; 
      transform: rotate(135deg);
    }
    
    .ic-datepicker .chevron.chevron-left::before {
      left: 0.25em;
      transform: rotate(-135deg);
    }
  `]
})
export class IcDatepickerComponent implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {
  @Input() options: IcDatepickerOptionsInterface = {};
  @Output() dateChange = new EventEmitter();
  @Output() monthChange = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  // Control Value Accessor setup
  selectedDay: IcDatepickerDay | null;
  propagateTouch: () => void = () => { };
  propagateChange: (_: any) => void = () => { };

  currentPeriod: Moment.Moment;
  datepickerIsOpen: boolean;
  dayLabels: string[];
  documentClickEvent: Function;
  initialised = false;
  mergedOptions: IcDatepickerOptions;
  nextMonthToggleActive: boolean;
  periodDays: IcDatepickerDay[];
  previousMonthToggleActive: boolean;
  yearSelectMode: boolean;
  yearOptions: IcDatepickerYear[];

  constructor(
    @Inject(IcDatepickerService) private icDatepickerService: IcDatepickerService,
    @Inject(Renderer) private renderer: Renderer,
    @Inject(ElementRef) private element: ElementRef
  ) { }

  /**
   * On Component init
   */
  ngOnInit() {
    this.mergedOptions = new IcDatepickerOptions(this.options, this.icDatepickerService);

    // @todo: calculate whether the selected month should display based on min/max dates. Set the initial view appropriately

    this.selectedDay = null;
    this.setCurrentPeriod(Moment());
    this.datepickerIsOpen = false;
    this.dayLabels = this.icDatepickerService.buildDayLabels();
    this.yearSelectMode = this.mergedOptions.defaultToYearSelect;
    this.yearOptions = this.buildYearOptions();
    this.toggleMonthToggles(this.currentPeriod);

    this.documentClickEvent = this.renderer.listenGlobal('document', 'click', (event: MouseEvent) => {
      event.stopPropagation();

      let closeDatepicker = true;
      let isTarget = this.element.nativeElement === event.target;
      let containsTarget = this.element.nativeElement.contains(event.target);

      if (!event.target || isTarget || containsTarget) {
        closeDatepicker = false;
      }

      if (closeDatepicker) {
        this.closeDatepicker();
      }
    });

    this.initialised = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialised) {
      this.mergedOptions = new IcDatepickerOptions(changes['options'].currentValue, this.icDatepickerService);
      this.setCurrentPeriod(this.currentPeriod);

      if (this.selectedDay) {
        this.selectedDay = this.icDatepickerService.buildDatepickerDay(
          this.selectedDay.moment,
          this.mergedOptions,
          this.selectedDay.moment
        );

        this.emitModelChange(this.selectedDay);
      }

      this.toggleMonthToggles(this.currentPeriod);
    }
  }

  /**
   * On Component destroy
   */
  ngOnDestroy() {
    // Remove the body click event to prevent memory leaks
    if (this.documentClickEvent) {
      this.documentClickEvent();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyboardInput(event: KeyboardEvent) {
    if (!this.datepickerIsOpen) {
      return false;
    }

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
  }

  /**
   * Update the selected day when the model value is changed externally
   *
   * @param value
   */
  writeValue(value: any) {
    if (!!value && value !== this.selectedDay) {
      if ('string' === typeof value) {
        value = Moment(value, this.mergedOptions.stringModelFormat);
      }

      if (value.isValid()) {
        let selectedMoment = this.selectedDay ? this.selectedDay.moment : null;
        value = this.icDatepickerService.buildDatepickerDay(value, this.mergedOptions, selectedMoment);
      } else {
        console.warn(`Invalid model value ${value} provided to the IcDatepickerComponent`);
        return false;
      }

      let isValid = true;

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
        return false;
      }

      this.selectedDay = value;
      this.setCurrentPeriod(value.moment);
    }
  }

  /**
   * Register an On Change callback
   *
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Register an On Touch callback
   *
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  /**
   * Toggle the disabled state of the component
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean) {
    // @todo: implement
  }

  /**
   * Returns the value for display in the input field
   *
   * @returns {string}
   */
  getInputValue() {
    let value = '';

    if (this.selectedDay && this.selectedDay.formattedDate) {
      value = this.selectedDay.formattedDate;
    }

    return value;
  }

  /**
   * Toggles the open state of the datepicker
   */
  toggleDatepicker() {
    this.datepickerIsOpen = !this.datepickerIsOpen;

    let event = this.datepickerIsOpen ? this.opened : this.closed;

    event.emit();
  }

  /**
   * Closes the Datepicker
   */
  closeDatepicker() {
    this.datepickerIsOpen = false;

    this.closed.emit();
  }

  showMonth(direction: 'next' | 'previous') {
    let originalValue = this.currentPeriod.clone();
    let updatedPeriod: Moment.Moment;

    if ('next' === direction) {
      updatedPeriod = this.currentPeriod.clone().add(1, 'month');
    } else {
      updatedPeriod = this.currentPeriod.clone().subtract(1, 'month');
    }

    this.toggleMonthToggles(updatedPeriod);
    this.setCurrentPeriod(updatedPeriod);

    this.monthChange.emit({
      previous: originalValue.startOf('month'),
      value: updatedPeriod.clone().startOf('month')
    });
  }

  /**
   *
   * @param direction
   */
  showYears(direction: 'next' | 'previous') {
    let currentLastYear: Moment.Moment;

    if ('next' === direction) {
      currentLastYear = this.yearOptions[this.yearOptions.length - 1].moment.add(1, 'year');
    } else {
      currentLastYear = this.yearOptions[0].moment.subtract(25, 'years');
    }

    this.yearOptions = this.buildYearOptions(currentLastYear);
  }

  showYearSelectMode() {
    this.yearOptions = this.buildYearOptions();
    this.yearSelectMode = true;
  }

  hideYearSelectMode() {
    this.yearSelectMode = false;
  }

  setSelectedDay(day: IcDatepickerDay, $event?: MouseEvent) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (day.isPlaceholder && day.isDisabled) {
      return false;
    }

    if (this.selectedDay && this.selectedDay.moment && day.moment && day.moment.isSame(this.selectedDay.moment)) {
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
  }

  /**
   *
   * @param year
   */
  setSelectedYear(year: IcDatepickerYear) {
    let newDate = this.currentPeriod.format('DD/MM') + '/' + year.moment.format('YYYY');

    this.setCurrentPeriod(Moment(newDate, 'DD/MM/YYYY'));

    this.hideYearSelectMode();

    /*
      Timeout is required to prevent the datepicker from closing when clicking a year due to
      the year element from no longer existing at the point when the element.contains() check
      is evaluated.
     */
    setTimeout(() => {
      this.yearOptions = this.buildYearOptions();
    });
  }

  /**
   * Enables or disables the next/previous month toggles based on any provided min or max dates
   *
   * @param updatedPeriod
   */
  private toggleMonthToggles(updatedPeriod: Moment.Moment) {
    if (!this.mergedOptions.minDate) {
      this.previousMonthToggleActive = true;
    } else {
      this.previousMonthToggleActive = updatedPeriod.clone()
        .subtract(1, 'month')
        .startOf('month')
        .isSameOrAfter(
          this.mergedOptions
            .minDate
            .clone()
            .startOf('month')
        );
    }

    if (!this.mergedOptions.maxDate) {
      this.nextMonthToggleActive = true;
    } else {
      this.nextMonthToggleActive = updatedPeriod.clone()
        .add(1, 'month')
        .startOf('month')
        .isSameOrBefore(
          this.mergedOptions
            .maxDate
            .clone()
            .startOf('month')
        );
    }
  }

  /**
   * Sets the currently rendered month period and generates the Day collection within that period
   *
   * @param momentInstance
   */
  private setCurrentPeriod(momentInstance: Moment.Moment) {
    let selectedDay: Moment.Moment | null = null;

    if (this.selectedDay && this.selectedDay.moment) {
      selectedDay = this.selectedDay.moment;
    }

    this.currentPeriod = momentInstance;
    this.periodDays = this.icDatepickerService.buildCalendarMonth(
      this.currentPeriod.clone(),
      this.mergedOptions,
      selectedDay
    );
  }

  /**
   *
   * @param year
   * @returns {IcDatepickerYear[]}
   */
  private buildYearOptions(
    year: Moment.Moment = this.currentPeriod.clone().subtract(12, 'years')
  ) {
    let years: IcDatepickerYear[] = [];
    let end = year.clone().add(25, 'years');

    while (year.isBefore(end)) {
      let isDisabled = false;
      let minDate = this.mergedOptions.minDate;
      let maxDate = this.mergedOptions.maxDate;

      if (
        (minDate && year.isBefore(minDate, 'year')) ||
        (maxDate && year.isAfter(maxDate, 'year'))
      ) {
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
  }

  /**
   * Emits a model change
   *
   * @param day
   */
  private emitModelChange(day: IcDatepickerDay) {
    let originalValue: any;
    let updatedValue: any;

    switch (this.mergedOptions.modelType) {
      case 'moment':
        originalValue = this.selectedDay ? this.selectedDay.moment : null;
        updatedValue = day.moment;
        break;

      case 'IcDatepickerDay':
        originalValue = this.selectedDay;
        updatedValue = day;
        break;

      case 'date':
        originalValue = this.selectedDay ? this.selectedDay.moment.toDate() : null;
        updatedValue = day.moment.toDate();
        break;

      case 'string':
        originalValue = this.selectedDay ? this.selectedDay.moment.format(this.mergedOptions.stringModelFormat) : null;
        updatedValue = day.moment.format(this.mergedOptions.stringModelFormat);
        break;
    }

    // Inform change listeners of the change
    this.propagateChange(updatedValue);
    this.dateChange.emit({
      previous: originalValue,
      value: updatedValue
    });
  }
}
