import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as Moment from 'moment';

import { IcDatepickerComponent } from './ic-datepicker.component';
import { IcDatepickerModule } from './ic-datepicker.module';

// Tests

let component: IcDatepickerComponent;
let fixture: ComponentFixture<IcDatepickerComponent>;
let outerEl: HTMLElement| null;
let datepickerPopupDe: DebugElement;
let datepickerPopupEl: HTMLElement;
let inputDe: DebugElement;
let inputEl: HTMLElement;

describe('Component: IcDatepickerComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ IcDatepickerModule ],
      providers: []
    });

    fixture = TestBed.createComponent(IcDatepickerComponent);
    component = fixture.componentInstance;

    // Datepicker Popup Container
    datepickerPopupDe = fixture.debugElement.query(By.css('.ic-datepicker'));
    datepickerPopupEl = datepickerPopupDe.nativeElement;

    // Outer Element
    outerEl = datepickerPopupEl.parentElement;

    // Datepicker Input
    inputDe = fixture.debugElement.query(By.css('.ic-datepicker-container > input[type="text"]'));
    inputEl = inputDe.nativeElement;
  });

  it('should update the selected value', () => {
    fixture.detectChanges();
    let newValue = Moment('2017-01-01', 'YYYY-MM-DD');

    component.writeValue(newValue);
    fixture.detectChanges();

    expect(component.selectedDay).not.toBeNull();

    if (component.selectedDay) {
      expect(component.selectedDay.moment.isSame(newValue)).toBe(true);
      expect(component.selectedDay.formattedDate).toBe(newValue.format('L'));
    }
  });

  it('should not open the datepicker by default', () => {
    fixture.detectChanges();

    expect(component.datepickerIsOpen).toBe(false);
    expect(datepickerPopupEl.style.display).toBe('none');
  });

  it('should show the previous month', () => {
    fixture.detectChanges();

    spyOn(component.monthChange, 'emit');

    let values = {
      previous: Moment('2017-01-01', 'YYYY-MM-DD'),
      value: Moment('2016-12-01', 'YYYY-MM-DD')
    };

    component.writeValue(values.value.clone());
    fixture.detectChanges();

    component.showMonth('previous');
    fixture.detectChanges();

    expect(component.currentPeriod.isSame(values.previous));
    expect(component.monthChange.emit).toHaveBeenCalled();
  });

  it('should show the next month', () => {
    fixture.detectChanges();

    spyOn(component.monthChange, 'emit');

    let originalValue = Moment('2017-01-01', 'YYYY-MM-DD');
    component.writeValue(originalValue);
    fixture.detectChanges();

    component.showMonth('next');
    fixture.detectChanges();

    expect(component.currentPeriod.isSame(originalValue.clone().add(1, 'month')));
    expect(component.monthChange.emit).toHaveBeenCalled();
  });

  it('should show the previous years', () => {
    fixture.detectChanges();

    let testYear = Moment('2017-01-01', 'YYYY-MM-DD');

    component.yearOptions = [{
      formatted: '',
      isDisabled: true,
      isSelected: false,
      isThisYear: false,
      moment: testYear.clone()
    }];

    component.showYears('previous');
    fixture.detectChanges();

    expect(
      component
        .yearOptions[component.yearOptions.length - 1]
        .moment.isSame(testYear.clone().subtract(1, 'year'))
    ).toBe(true);
    expect(component.yearOptions.length).toBe(25);
  });

  it('should show the next years', () => {
    fixture.detectChanges();

    let testYear = Moment('2017-01-01', 'YYYY-MM-DD');

    component.yearOptions = [{
      formatted: '',
      isDisabled: false,
      isSelected: false,
      isThisYear: false,
      moment: testYear.clone()
    }];

    component.showYears('next');
    fixture.detectChanges();

    expect(
      component
        .yearOptions[0]
        .moment.isSame(testYear.clone().add(1, 'year'))
    ).toBe(true);
    expect(component.yearOptions.length).toBe(25);
  });

  it('should update the selected day', () => {
    fixture.detectChanges();

    spyOn(component, 'propagateChange');
    spyOn(component.dateChange, 'emit');

    let momentInstance = Moment('2017-01-01', 'YYYY-MM-DD');
    let day = { moment: momentInstance };
    component.setSelectedDay(day);
    fixture.detectChanges();

    expect(component.currentPeriod.isSame(momentInstance)).toBe(true);
    expect(component.propagateChange).toHaveBeenCalled();
    expect(component.dateChange.emit).toHaveBeenCalled();
  });

  it('should not display year select mode by default', () => {
    fixture.detectChanges();
    expect(component.yearSelectMode).toBe(false);
  });

  it('should set the day labels', () => {
    fixture.detectChanges();
    expect(component.dayLabels.length).toBe(7);
  });

  it('should set the year options', () => {
    fixture.detectChanges();
    expect(component.yearOptions.length).toBe(25);
  });

  it('should toggle the datepicker open state', () => {
    fixture.detectChanges();
    expect(component.datepickerIsOpen).toBe(false);

    component.toggleDatepicker();
    fixture.detectChanges();
    expect(component.datepickerIsOpen).toBe(true);

    component.toggleDatepicker();
    fixture.detectChanges();
    expect(component.datepickerIsOpen).toBe(false);
  });

  it('should show the year select mode', () => {
    fixture.detectChanges();
    component.showYearSelectMode();
    fixture.detectChanges();

    expect(component.yearSelectMode).toBe(true);
  });

  it('should hide the year select mode', () => {
    component.yearSelectMode = true;
    fixture.detectChanges();

    component.hideYearSelectMode();
    fixture.detectChanges();
    expect(component.yearSelectMode).toBe(false);
  });

  it('should close the datepicker', () => {
    component.datepickerIsOpen = true;
    fixture.detectChanges();

    component.closeDatepicker();
    fixture.detectChanges();
    expect(component.datepickerIsOpen).toBe(false);
  });

  it('should open the datepicker when the input is clicked', () => {
    fixture.whenStable().then(() => {
      inputEl.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(datepickerPopupEl.style.display).toBe('block');
      });
    });
  });
});
