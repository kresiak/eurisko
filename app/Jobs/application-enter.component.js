"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var data_service_1 = require('./../Shared/Services/data.service');
var forms_1 = require('@angular/forms');
var ApplicationEnterComponent = (function () {
    function ApplicationEnterComponent(dataStore, formBuilder) {
        this.dataStore = dataStore;
        this.formBuilder = formBuilder;
    }
    ApplicationEnterComponent.prototype.ngOnInit = function () {
        this.applicationForm = this.formBuilder.group({
            surname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]]
        });
    };
    ApplicationEnterComponent.prototype.save = function (formValue, isValid) {
        var _this = this;
        this.dataStore.addData('job.response', {
            'jobId': this.jobId,
            surname: formValue.surname,
            name: formValue.name
        }).subscribe(function (res) {
            var x = res;
            _this.reset();
        });
    };
    ApplicationEnterComponent.prototype.reset = function () {
        this.applicationForm.reset();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ApplicationEnterComponent.prototype, "jobId", void 0);
    ApplicationEnterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-application-enter',
            templateUrl: './application-enter.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, forms_1.FormBuilder])
    ], ApplicationEnterComponent);
    return ApplicationEnterComponent;
}());
exports.ApplicationEnterComponent = ApplicationEnterComponent;
//# sourceMappingURL=application-enter.component.js.map