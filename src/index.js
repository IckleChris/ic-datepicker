"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ic_datepicker_component_1 = require("./components/ic-datepicker/ic-datepicker.component");
var ic_datepicker_service_1 = require("./services/ic-datepicker.service");
__export(require("./components/ic-datepicker/ic-datepicker.component"));
__export(require("./models/ic-datepicker-options"));
var IcDatepickerModule = IcDatepickerModule_1 = (function () {
    function IcDatepickerModule() {
    }
    IcDatepickerModule.forRoot = function () {
        return {
            ngModule: IcDatepickerModule_1,
            providers: [ic_datepicker_service_1.IcDatepickerService]
        };
    };
    return IcDatepickerModule;
}());
IcDatepickerModule = IcDatepickerModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            ic_datepicker_component_1.IcDatepickerComponent,
        ],
        exports: [
            ic_datepicker_component_1.IcDatepickerComponent,
        ]
    })
], IcDatepickerModule);
exports.IcDatepickerModule = IcDatepickerModule;
var IcDatepickerModule_1;
