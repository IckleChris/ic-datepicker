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
export { IcDatepickerModule };
IcDatepickerModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/** @nocollapse */
IcDatepickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ic-datepicker.module.js.map