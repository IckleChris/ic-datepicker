/// <reference types="moment" />
import { OnInit, Renderer, OnDestroy, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import Moment from 'moment';
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
    selectedDay: IcDatepickerDay;
    propagateTouch: () => void;
    propagateChange: (_: any) => void;
    currentPeriod: Moment.Moment;
    datepickerIsOpen: boolean;
    dayLabels: string[];
    documentClickEvent: Function;
    initialised: boolean;
    mergedOptions: IcDatepickerOptions;
    nextMonthToggleActive: boolean;
    periodDays: IcDatepickerDay[];
    previousMonthToggleActive: boolean;
    yearSelectMode: boolean;
    yearOptions: IcDatepickerYear[];
    constructor(icDatepickerService: IcDatepickerService, renderer: Renderer, element: ElementRef);
    /**
     * On Component init
     */
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * On Component destroy
     */
    ngOnDestroy(): void;
    onKeyboardInput(event: KeyboardEvent): false | undefined;
    /**
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
     * Toggles the open state of the datepicker
     */
    toggleDatepicker(): void;
    /**
     * Closes the Datepicker
     */
    closeDatepicker(): void;
    showMonth(direction: 'next' | 'previous'): void;
    /**
     *
     * @param direction
     */
    showYears(direction: 'next' | 'previous'): void;
    showYearSelectMode(): void;
    hideYearSelectMode(): void;
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
