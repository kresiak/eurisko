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
var Rx_1 = require('rxjs/Rx');
var ApplicationDetailComponent = (function () {
    function ApplicationDetailComponent(dataStore, jobService) {
        this.dataStore = dataStore;
        this.jobService = jobService;
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
        this.applicationObservable.subscribe(function (application) {
            _this.application = application;
        });
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
    ApplicationDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-application-detail',
            templateUrl: './application-detail.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, job_service_1.JobService])
    ], ApplicationDetailComponent);
    return ApplicationDetailComponent;
}());
exports.ApplicationDetailComponent = ApplicationDetailComponent;
//# sourceMappingURL=application-detail.component.js.map