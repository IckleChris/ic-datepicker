import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { OptionsListComponent } from './components/options-list/options-list.component';
import { OptionsRoutingModule } from './options-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forRoot(),
    OptionsRoutingModule
  ],
  declarations: [OptionsListComponent]
})
export class OptionsModule { }
