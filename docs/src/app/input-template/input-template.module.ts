import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTemplateComponent } from './components/input-template/input-template.component';
import { InputTemplateRoutingModule } from './input-template-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    InputTemplateRoutingModule
  ],
  declarations: [InputTemplateComponent]
})
export class InputTemplateModule { }
