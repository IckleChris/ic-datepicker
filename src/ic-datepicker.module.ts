import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { IcDatepickerComponent } from './ic-datepicker.component';
import { IcDatepickerService } from './services/ic-datepicker.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    IcDatepickerComponent
  ],
  exports: [
    IcDatepickerComponent
  ],
  providers: [IcDatepickerService]
})
export class IcDatepickerModule {}
