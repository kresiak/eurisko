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
var job_service_1 = require('../Shared/Services/job.service');
var UserDetailComponent = (function () {
    function UserDetailComponent(dataStore, jobService) {
        this.dataStore = dataStore;
        this.jobService = jobService;
        this.isRoot = false;
        this.stateChanged = new core_1.EventEmitter();
        this.hasJobRequests = false;
    }
    UserDetailComponent.prototype.stateInit = function () {
        if (!this.state)
            this.state = {};
        if (!this.state.selectedTabId)
            this.state.selectedTabId = '';
    };
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateInit();
        this.userObservable.subscribe(function (user) {
            _this.user = user;
            if (user) {
                _this.annotatedJobsObservable = _this.jobService.getAnnotatedJobsByUserId(user.data._id);
                _this.annotatedJobsObservable.subscribe(function (jobs) {
                    _this.hasJobRequests = jobs && jobs.length > 0;
                });
            }
        });
    };
    UserDetailComponent.prototype.commentsUpdated = function (comments) {
        if (this.user && comments) {
            this.user.data.comments = comments;
            this.dataStore.updateData('users.eurisko', this.user.data._id, this.user.data);
        }
    };
    UserDetailComponent.prototype.emailUpdated = function (email) {
        this.user.data.email = email;
        this.dataStore.updateData('users.eurisko', this.user.data._id, this.user.data);
    };
    UserDetailComponent.prototype.beforeTabChange = function ($event) {
        this.state.selectedTabId = $event.nextId;
        this.stateChanged.next(this.state);
    };
    ;
    UserDetailComponent.prototype.childProductsStateChanged = function ($event) {
        this.state.Products = $event;
        this.stateChanged.next(this.state);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], UserDetailComponent.prototype, "userObservable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserDetailComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserDetailComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserDetailComponent.prototype, "isRoot", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserDetailComponent.prototype, "stateChanged", void 0);
    UserDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-user-detail',
            templateUrl: './user-detail.component.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, job_service_1.JobService])
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map