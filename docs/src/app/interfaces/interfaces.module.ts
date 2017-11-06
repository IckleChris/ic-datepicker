import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { InterfaceListComponent } from './components/interface-list/interface-list.component';
import { InterfacesRoutingModule } from './interfaces-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forRoot(),
    InterfacesRoutingModule
  ],
  declarations: [InterfaceListComponent]
})
export class InterfacesModule { }
