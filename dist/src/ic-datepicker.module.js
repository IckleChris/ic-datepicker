var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IcDatepickerComponent } from './ic-datepicker.component';
import { IcDatepickerService } from './services/ic-datepicker.service';
var IcDatepickerModule = (function () {
    function IcDatepickerModule() {
    }
    return IcDatepickerModule;
}());
IcDatepickerModule = __decorate([
    NgModule({
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
], IcDatepickerModule);
export { IcDatepickerModule };
//# sourceMappingURL=ic-datepicker.module.js.map