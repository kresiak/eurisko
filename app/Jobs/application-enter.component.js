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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var ApplicationEnterComponentRoutable = (function () {
    function ApplicationEnterComponentRoutable(route) {
        this.route = route;
    }
    ApplicationEnterComponentRoutable.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    ApplicationEnterComponentRoutable = __decorate([
        core_1.Component({
            template: "<gg-application-enter [jobId]=\"id\"></gg-application-enter>"
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], ApplicationEnterComponentRoutable);
    return ApplicationEnterComponentRoutable;
}());
exports.ApplicationEnterComponentRoutable = ApplicationEnterComponentRoutable;
var ApplicationEnterComponent = (function () {
    function ApplicationEnterComponent(dataStore, formBuilder, router) {
        this.dataStore = dataStore;
        this.formBuilder = formBuilder;
        this.router = router;
    }
    ApplicationEnterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataStore.getDataObservable('job.request').map(function (jobs) { return jobs.filter(function (job) { return job._id === _this.jobId; })[0]; }).subscribe(function (job) {
            _this.job = job;
        });
        this.applicationForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            age: ['', [forms_1.Validators.required]],
            citizenship: ['', [forms_1.Validators.required]],
            address: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.required]],
            telephone: ['', [forms_1.Validators.required]],
            countryOfResidence: ['', [forms_1.Validators.required]],
            education: ['', [forms_1.Validators.required]],
            publications: ['', [forms_1.Validators.required]],
            presentOccupation: ['', [forms_1.Validators.required]],
            motivation: ['', [forms_1.Validators.required]]
        });
    };
    ApplicationEnterComponent.prototype.save = function (formValue, isValid) {
        var _this = this;
        this.dataStore.addData('job.response', {
            'jobId': this.jobId,
            name: formValue.name,
            firstName: formValue.firstName,
            age: formValue.age,
            citizenship: formValue.citizenship,
            address: formValue.address,
            email: formValue.email,
            telephone: formValue.telephone,
            countryOfResidence: formValue.countryOfResidence,
            education: formValue.education,
            publications: formValue.publications,
            presentOccupation: formValue.presentOccupation,
            motivation: formValue.motivation
        }).subscribe(function (res) {
            var link = ['/jobview', _this.jobId];
            _this.router.navigate(link);
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
        __metadata('design:paramtypes', [data_service_1.DataStore, forms_1.FormBuilder, router_1.Router])
    ], ApplicationEnterComponent);
    return ApplicationEnterComponent;
}());
exports.ApplicationEnterComponent = ApplicationEnterComponent;
//# sourceMappingURL=application-enter.component.js.map