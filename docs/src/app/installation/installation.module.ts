import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallationComponent } from './components/installation/installation.component';
import { InstallationRoutingModule } from './installation-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    InstallationRoutingModule
  ],
  declarations: [InstallationComponent]
})
export class InstallationModule { }
