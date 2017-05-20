import { OnInit, Renderer, OnDestroy, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as Moment from 'moment';
import { IcDatepickerOptions } from './models/ic-datepicker-options';
import { IcDatepickerDay } from './interfaces/ic-datepicker-day';
import { IcDatepickerOptionsInterface } from './interfaces/ic-datepicker-options';
import { IcDatepickerService } from './services/ic-datepicker.service';
import { IcDatepickerYear } from './interfaces/ic-datepicker-year';
export declare class IcDatepickerComponent implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {
    private icDatepickerService;
    private renderer;
    private element;
    options: IcDatepickerOptionsInterface;
    dateChange: EventEmitter<{}>;
    monthChange: EventEmitter<{}>;
    opened: EventEmitter<{}>;
    closed: EventEmitter<{}>;
    selectedDay: IcDatepickerDay | null;
    propagateTouch: () => void;
    propagateChange: (_: any) => void;
    currentPeriod: Moment.Moment;
    datepickerIsOpen: boolean;
    dayLabels: string[];
    documentClickEvent: Function;
    initialised: boolean;
    isDisabled: boolean;
    mergedOptions: IcDatepickerOptions;
    nextMonthToggleActive: boolean;
    periodDays: IcDatepickerDay[];
    previousMonthToggleActive: boolean;
    yearSelectMode: boolean;
    yearOptions: IcDatepickerYear[];
    /**
     * IcDatepickerComponent Constructor
     *
     * @param icDatepickerService
     * @param renderer
     * @param element
     */
    constructor(icDatepickerService: IcDatepickerService, renderer: Renderer, element: ElementRef);
    /**
     * On Component init
     */
    ngOnInit(): void;
    /**
     * On @Input() changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * On Component destroy
     */
    ngOnDestroy(): void;
    /**
     * Keyboard events
     *
     * @param event
     * @returns {boolean}
     */
    onKeyboardInput(event: KeyboardEvent): void;
    /**
     * Update the selected day when the model value is changed externally
     *
     * @param value
     */
    writeValue(value: any): false | undefined;
    /**
     * Register an On Change callback
     *
     * @param fn
     */
    registerOnChange(fn: any): void;
    /**
     * Register an On Touch callback
     *
     * @param fn
     */
    registerOnTouched(fn: any): void;
    /**
     * Toggle the disabled state of the component
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Returns the value for display in the input field
     *
     * @returns {string}
     */
    getInputValue(): string;
    /**
     * Toggles the open state of the datepicker
     */
    toggleDatepicker(): void;
    /**
     * Closes the Datepicker
     */
    closeDatepicker(): void;
    /**
     * Toggles the displayed month
     *
     * @param direction
     */
    showMonth(direction: 'next' | 'previous'): void;
    /**
     *
     * @param direction
     */
    showYears(direction: 'next' | 'previous'): void;
    /**
     * Shows the Year selection panel
     */
    showYearSelectMode(): void;
    /**
     * Hides the Year selection panel
     */
    hideYearSelectMode(): void;
    /**
     * Sets the internally tracked selected day to equal the provided day
     *
     * @param day
     * @param $event
     * @returns {boolean}
     */
    setSelectedDay(day: IcDatepickerDay, $event?: MouseEvent): false | undefined;
    /**
     *
     * @param year
     */
    setSelectedYear(year: IcDatepickerYear): void;
    /**
     * Enables or disables the next/previous month toggles based on any provided min or max dates
     *
     * @param updatedPeriod
     */
    private toggleMonthToggles(updatedPeriod);
    /**
     * Sets the currently rendered month period and generates the Day collection within that period
     *
     * @param momentInstance
     */
    private setCurrentPeriod(momentInstance);
    /**
     * Builds the list of Year options for the Year select panel
     *
     * @param year
     * @returns {IcDatepickerYear[]}
     */
    private buildYearOptions(year?);
    /**
     * Emits a model change
     *
     * @param day
     */
    private emitModelChange(day);
}
