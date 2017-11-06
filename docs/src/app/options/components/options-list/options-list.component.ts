import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss']
})
export class OptionsListComponent implements OnInit {
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
    { label: 'showEmptyRow' },
    { label: 'stringModelFormat' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

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

  onOptionChange(option) {
    this.router.navigate(['/options', option.label]);
  }

  getMarkdownPathByConfigOption(configOption) {
    return this.markdownPath + `${configOption.label}.md`;
  }
}
