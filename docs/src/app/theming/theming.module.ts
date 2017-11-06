import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemingComponent } from './components/theming/theming.component';
import { ThemingRoutingModule } from './theming-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ThemingRoutingModule,
  ],
  declarations: [ThemingComponent]
})
export class ThemingModule { }
