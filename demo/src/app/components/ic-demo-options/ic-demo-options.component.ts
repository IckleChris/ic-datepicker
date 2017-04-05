import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ic-demo-options',
  templateUrl: './ic-demo-options.component.html',
  styleUrls: ['./ic-demo-options.component.scss']
})
export class IcDemoOptionsComponent implements OnInit {
  activeOption: any;
  markdownPath = 'assets/docs/options/';
  options = [
    { label: 'attrs' },
    { label: 'clearInvalidDates' },
    { label: 'closeOnSelect' },
    { label: 'customDayClasses' },
    { label: 'dayQuickOptions' },
    { label: 'defaultToYearSelect' },
    { label: 'disableDayFn' },
    { label: 'disableWeekends' },
    { label: 'icons' },
    { label: 'inputClasses' },
    { label: 'maxDate' },
    { label: 'minDate' },
    { label: 'modelType' },
    { label: 'position' },
    { label: 'showDayQuickOptions' },
    { label: 'stringModelFormat' },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let activeOption;

      if (params['option']) {
        activeOption = this.options.filter(option => {
          return option.label === params['option'];
        })[0];
      }

      if (!activeOption) {
        activeOption = this.options[0];
      }

      this.activeOption = activeOption;
    });
  }

  getMarkdownPathByConfigOption(configOption) {
    return this.markdownPath + `${configOption.label}.md`;
  }
}
