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
var Rx_1 = require('rxjs/Rx');
var forms_1 = require('@angular/forms');
var JobEnterComponent = (function () {
    function JobEnterComponent(dataStore, formBuilder) {
        this.dataStore = dataStore;
        this.formBuilder = formBuilder;
    }
    JobEnterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userObservable.subscribe(function (user) {
            _this.userId = user.data._id;
        });
        this.jobForm = this.formBuilder.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]]
        });
    };
    JobEnterComponent.prototype.save = function (formValue, isValid) {
        var _this = this;
        this.dataStore.addData('job.request', {
            title: formValue.title,
            userId: this.userId,
            description: this.description,
            education: this.education,
            requirements: this.requirements,
            procedure: this.procedure,
            isPublished: false
        }).subscribe(function (res) {
            var x = res;
            _this.reset();
        });
    };
    JobEnterComponent.prototype.reset = function () {
        this.jobForm.reset();
        this.descriptionChild.resetContent();
        this.educationChild.resetContent();
        this.requirementsChild.resetContent();
        this.procedureChild.resetContent();
    };
    JobEnterComponent.prototype.descriptionChanged = function (content) {
        this.description = content;
    };
    JobEnterComponent.prototype.educationChanged = function (content) {
        this.education = content;
    };
    JobEnterComponent.prototype.requirementsChanged = function (content) {
        this.requirements = content;
    };
    JobEnterComponent.prototype.procedureChanged = function (content) {
        this.procedure = content;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], JobEnterComponent.prototype, "userObservable", void 0);
    __decorate([
        core_1.ViewChild('descriptionChild'), 
        __metadata('design:type', Object)
    ], JobEnterComponent.prototype, "descriptionChild", void 0);
    __decorate([
        core_1.ViewChild('educationChild'), 
        __metadata('design:type', Object)
    ], JobEnterComponent.prototype, "educationChild", void 0);
    __decorate([
        core_1.ViewChild('requirementsChild'), 
        __metadata('design:type', Object)
    ], JobEnterComponent.prototype, "requirementsChild", void 0);
    __decorate([
        core_1.ViewChild('procedureChild'), 
        __metadata('design:type', Object)
    ], JobEnterComponent.prototype, "procedureChild", void 0);
    JobEnterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-job-enter',
            templateUrl: './job-enter.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, forms_1.FormBuilder])
    ], JobEnterComponent);
    return JobEnterComponent;
}());
exports.JobEnterComponent = JobEnterComponent;
//# sourceMappingURL=job-enter.component.js.map