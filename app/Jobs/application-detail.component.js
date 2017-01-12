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
var job_service_1 = require('../Shared/Services/job.service');
var user_service_1 = require('./../Shared/Services/user.service');
var Rx_1 = require('rxjs/Rx');
var forms_1 = require('@angular/forms');
var ApplicationDetailComponent = (function () {
    function ApplicationDetailComponent(dataStore, jobService, formBuilder, userService) {
        this.dataStore = dataStore;
        this.jobService = jobService;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.isRoot = false;
        this.stateChanged = new core_1.EventEmitter();
    }
    ApplicationDetailComponent.prototype.stateInit = function () {
        if (!this.state)
            this.state = {};
        if (!this.state.selectedTabId)
            this.state.selectedTabId = '';
    };
    ApplicationDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateInit();
        this.applicationViewForm = this.formBuilder.group({
            // piScore: ['', [Validators.required]],
            piRemarque: ['', [forms_1.Validators.required]]
        });
        this.applicationObservable.subscribe(function (application) {
            _this.application = application;
            _this.applicationViewForm.controls['piRemarque'].setValue(_this.application && _this.application.data && _this.application.data.piFeedback ? _this.application.data.piFeedback.comment : '');
            _this.currentRate = _this.application && _this.application.data && _this.application.data.piFeedback ? _this.application.data.piFeedback.score : 0;
            // this.applicationViewForm.controls['piScore'].setValue(this.application && this.application.data && this.application.data.piFeedback ? this.application.data.piFeedback.score : '')
        });
    };
    ApplicationDetailComponent.prototype.setDashlet = function () {
        this.userService.createApplicationDashletForCurrentUser(this.application.data._id);
    };
    ApplicationDetailComponent.prototype.removeDashlet = function (dashletId) {
        if (dashletId)
            this.userService.removeDashletForCurrentUser(dashletId);
    };
    ApplicationDetailComponent.prototype.beforeTabChange = function ($event) {
        if ($event.nextId === 'tabMax') {
            $event.preventDefault();
        }
        if ($event.nextId === 'gotoTop') {
            $event.preventDefault();
            //this.navigationService.jumpToTop()
            return;
        }
        this.state.selectedTabId = $event.nextId;
        this.stateChanged.next(this.state);
    };
    ;
    ApplicationDetailComponent.prototype.childResponsesStateChanged = function ($event) {
        this.state.Responses = $event;
        this.stateChanged.next(this.state);
    };
    ApplicationDetailComponent.prototype.save = function (formValue, isValid) {
        this.application.data.piFeedback = {
            score: this.currentRate,
            comment: formValue.piRemarque
        };
        this.dataStore.updateData('job.response', this.application.data._id, this.application.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], ApplicationDetailComponent.prototype, "applicationObservable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ApplicationDetailComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ApplicationDetailComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ApplicationDetailComponent.prototype, "isRoot", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ApplicationDetailComponent.prototype, "stateChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ApplicationDetailComponent.prototype, "responseId", void 0);
    ApplicationDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-application-detail',
            templateUrl: './application-detail.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, job_service_1.JobService, forms_1.FormBuilder, user_service_1.UserService])
    ], ApplicationDetailComponent);
    return ApplicationDetailComponent;
}());
exports.ApplicationDetailComponent = ApplicationDetailComponent;
var NgbdRatingBasic = (function () {
    function NgbdRatingBasic() {
        this.currentRate = 8;
    }
    NgbdRatingBasic = __decorate([
        core_1.Component({
            selector: 'ngbd-rating-basic',
        }), 
        __metadata('design:paramtypes', [])
    ], NgbdRatingBasic);
    return NgbdRatingBasic;
}());
exports.NgbdRatingBasic = NgbdRatingBasic;
//# sourceMappingURL=application-detail.component.js.map