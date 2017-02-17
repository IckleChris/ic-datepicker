import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { IcDatepickerModule } from 'ic-datepicker';

import { AppComponent } from './app.component';
import { IcDemoHeaderComponent } from './components/ic-demo-header/ic-demo-header.component';
import { IcDemoInstallationComponent } from './components/ic-demo-installation/ic-demo-installation.component';
import { IcDemoExampleComponent } from './components/ic-demo-example/ic-demo-example.component';
import { AppRoutingModule } from "./app-routing.module";
import { IcDemoOptionsComponent } from './components/ic-demo-options/ic-demo-options.component';
import { CommonModule } from "@angular/common";
import { DatepickerConfigFormComponent } from './components/ic-demo-example/components/datepicker-config-form/datepicker-config-form.component';
import { IcInterfacesComponent } from './components/ic-interfaces/ic-interfaces.component';
import { IcDemoEventsComponent } from './components/ic-demo-events/ic-demo-events.component';

@NgModule({
  declarations: [
    AppComponent,
    IcDemoHeaderComponent,
    IcDemoInstallationComponent,
    IcDemoExampleComponent,
    IcDemoOptionsComponent,
    DatepickerConfigFormComponent,
    IcInterfacesComponent,
    IcDemoEventsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MarkdownToHtmlModule.forRoot(),
    AppRoutingModule,
    IcDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
