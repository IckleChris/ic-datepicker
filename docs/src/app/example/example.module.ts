import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './components/example/example.component';
import { ExampleRoutingModule } from './example-routing.module';
import { DatepickerConfigFormComponent } from './components/datepicker-config-form/datepicker-config-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IcDatepickerModule } from 'ic-datepicker';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    IcDatepickerModule.forRoot(),
    ExampleRoutingModule
  ],
  declarations: [ExampleComponent, DatepickerConfigFormComponent]
})
export class ExampleModule { }
