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
var Rx_1 = require('rxjs/Rx');
var data_service_1 = require('./../Shared/Services/data.service');
var job_service_1 = require('./../Shared/Services/job.service');
var JobDetailComponent = (function () {
    function JobDetailComponent(dataStore, jobService) {
        this.dataStore = dataStore;
        this.jobService = jobService;
        this.isRoot = false;
        this.stateChanged = new core_1.EventEmitter();
    }
    JobDetailComponent.prototype.stateInit = function () {
        if (!this.state)
            this.state = {};
        if (!this.state.selectedTabId)
            this.state.selectedTabId = '';
    };
    JobDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateInit();
        this.jobObservable.subscribe(function (job) {
            _this.job = job;
            if (job) {
                _this.applicationsObservable = _this.jobService.getAnnotatedResponsesByJobId(job.data._id);
                _this.applicationsObservable.subscribe(function (applications) {
                    _this.applications = applications;
                });
            }
        });
    };
    JobDetailComponent.prototype.commentsUpdated = function (comments) {
        if (this.job && comments) {
            this.job.data.comments = comments;
            this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
        }
    };
    JobDetailComponent.prototype.beforeTabChange = function ($event) {
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
    JobDetailComponent.prototype.childResponsesStateChanged = function ($event) {
        this.state.Responses = $event;
        this.stateChanged.next(this.state);
    };
    JobDetailComponent.prototype.titleChanged = function (title) {
        this.job.data.title = title;
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    };
    JobDetailComponent.prototype.publishedUpdated = function (isPublished) {
        this.job.data.isPublished = isPublished;
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    };
    JobDetailComponent.prototype.descriptionChanged = function (description) {
        this.job.data.description = description;
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    };
    JobDetailComponent.prototype.educationChanged = function (education) {
        this.job.data.education = education;
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    };
    JobDetailComponent.prototype.procedureChanged = function (procedure) {
        this.job.data.procedure = procedure;
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    };
    JobDetailComponent.prototype.requirementsChanged = function (requirements) {
        this.job.data.requirements = requirements;
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], JobDetailComponent.prototype, "jobObservable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JobDetailComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JobDetailComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JobDetailComponent.prototype, "isRoot", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobDetailComponent.prototype, "stateChanged", void 0);
    JobDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-job-detail',
            templateUrl: './job-detail.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, job_service_1.JobService])
    ], JobDetailComponent);
    return JobDetailComponent;
}());
exports.JobDetailComponent = JobDetailComponent;
//# sourceMappingURL=job-detail.component.js.map