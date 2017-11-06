import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcDatepickerComponent } from './components/ic-datepicker/ic-datepicker.component';
import { IcDatepickerService } from './services/ic-datepicker.service';

export * from './components/ic-datepicker/ic-datepicker.component';
export * from './interfaces/ic-datepicker-day';
export * from './interfaces/ic-datepicker-icon';
export * from './interfaces/ic-datepicker-options';
export * from './interfaces/ic-datepicker-quick-option';
export * from './interfaces/ic-datepicker-year';
export * from './models/ic-datepicker-options';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IcDatepickerComponent,
  ],
  exports: [
    IcDatepickerComponent,
  ]
})
export class IcDatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IcDatepickerModule,
      providers: [IcDatepickerService]
    };
  }
}
