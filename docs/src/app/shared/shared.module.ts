import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TerminalComponent } from './components/terminal/terminal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule
  ],
  declarations: [HeaderBarComponent, TerminalComponent],
  exports: [HeaderBarComponent, TerminalComponent]
})
export class SharedModule { }
