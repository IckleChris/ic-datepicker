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
  exampleDatepickerConfig: IcDatepickerOptionsInterface;
  showDatepicker = true;

  constructor() {}

  ngOnInit() {
    this.exampleDatepickerConfig = {
      attrs: {
        id: 'example-datepicker'
      },
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
      maxDate: null,
      minDate: null,
      modelType: 'moment',
      position: 'bottom',
      showDayQuickOptions: true,
      stringModelFormat: 'YYYY-MM-DD'
    };

    this.exampleDatepickerForm = new FormGroup({
      datepicker: new FormControl(Moment())
    });

    const dateChange$ = this.exampleDatepickerForm.get('datepicker').valueChanges;

    dateChange$.subscribe((date) => {
      this.displayDate = date;
    });
  }

  onConfigChanged($event) {
    this.showDatepicker = false;

    setTimeout(() => {
      let config = $event.config;
      config.inputClasses = ['form-control'];
      this.exampleDatepickerConfig = config;
      this.showDatepicker = true;
    });
  }
}
