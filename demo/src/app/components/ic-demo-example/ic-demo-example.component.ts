import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import Moment from 'moment';
import { IcDatepickerOptionsInterface } from "ic-datepicker";

@Component({
  selector: 'ic-ic-demo-example',
  templateUrl: './ic-demo-example.component.html',
  styleUrls: ['./ic-demo-example.component.scss']
})
export class IcDemoExampleComponent implements OnInit {
  displayDate: any;
  exampleDatepickerForm: FormGroup;
  exampleDatepickerConfig: any;
  iconSets = {
    svg: {
      nextMonth: { classes: ['chevron', 'chevron-right'] },
      nextYears: { classes: ['chevron', 'chevron-down'] },
      previousMonth: { classes: ['chevron', 'chevron-left'] },
      previousYears: { classes: ['chevron', 'chevron-up'] }
    },
    fontAwesome: {
      nextMonth: { classes: ['fa', 'fa-chevron-right'] },
      nextYears: { classes: ['fa', 'fa-chevron-down'] },
      previousMonth: { classes: ['fa', 'fa-chevron-left'] },
      previousYears: { classes: ['fa', 'fa-chevron-up'] }
    },
    material: {
      nextMonth: {
        classes: ['material-icons'],
        content: 'chevron_right'
      },
      nextYears: {
        classes: ['material-icons'],
        content: 'keyboard_arrow_down'
      },
      previousMonth: {
        classes: ['material-icons'],
        content: 'chevron_left'
      },
      previousYears: {
        classes: ['material-icons'],
        content: 'keyboard_arrow_up'
      }
    }
  };
  showDatepicker = true;

  constructor() {}

  ngOnInit() {
    this.exampleDatepickerConfig = {
      attrs: {
        id: 'example-datepicker'
      },
      clearInvalidDates: true,
      closeOnSelect: true,
      customDayClasses: [
        {
          classes: ['highlight'],
          callback: (momentInstance) => {
            return momentInstance.isoWeekday() === 1;
          }
        }
      ],
      disableWeekends: false,
      displayFormat: 'L',
      inputClasses: ['form-control'],
      maxDate: Moment().add(2, 'month'),
      minDate: Moment(),
      modelType: 'string',
      position: 'bottom',
      showDayQuickOptions: true,
      stringModelFormat: 'YYYY-MM-DD'
    };

    this.exampleDatepickerForm = new FormGroup({
      datepicker: new FormControl({
        value: Moment().add(3, 'months').format('YYYY-MM-DD'),
        disabled: false
      })
    });

    const dateChange$ = this.exampleDatepickerForm.get('datepicker').valueChanges;

    dateChange$.subscribe((date) => {
      this.displayDate = date;
    });
  }

  onConfigChanged($event) {

    setTimeout(() => {
      let datepicker = this.exampleDatepickerForm.get('datepicker');
      let config = this.buildEventConfig($event.config);
      config.inputClasses = ['form-control'];

      if (config.disableDatepicker) {
        datepicker.disable();
      } else {
        datepicker.enable();
      }

      this.exampleDatepickerConfig = config;
    });
  }

  buildEventConfig(config) {
    let icons = this.iconSets.svg;

    if (this.iconSets[config.iconSet]) {
      icons = this.iconSets[config.iconSet]
    }

    config.icons = icons;

    return config;
  }

  onSubmit(form) {
    console.log('Submitted Value: ' + form.value.datepicker);
  }

  clearDatepicker() {
    this.exampleDatepickerForm.patchValue({
      datepicker: null
    });
  }
}
