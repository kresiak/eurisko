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
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var data_service_1 = require('./../Shared/Services/data.service');
var JobViewComponentRoutable = (function () {
    function JobViewComponentRoutable(dataStore, route) {
        this.dataStore = dataStore;
        this.route = route;
    }
    JobViewComponentRoutable.prototype.initData = function (id) {
        var _this = this;
        if (id) {
            this.jobObservable = this.dataStore.getAnnotableDataObservable('job.request').map(function (jobs) { return jobs.filter(function (job) { return job.data._id === id; })[0]; });
            this.jobObservable.subscribe(function (obj) {
                _this.job = obj;
            });
        }
    };
    JobViewComponentRoutable.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.initData(id);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], JobViewComponentRoutable.prototype, "jobObservable", void 0);
    JobViewComponentRoutable = __decorate([
        core_1.Component({
            template: "<gg-job-view [jobObservable]=\"jobObservable\"></gg-job-view>"
        }), 
        __metadata('design:paramtypes', [data_service_1.DataStore, router_1.ActivatedRoute])
    ], JobViewComponentRoutable);
    return JobViewComponentRoutable;
}());
exports.JobViewComponentRoutable = JobViewComponentRoutable;
var JobViewComponent = (function () {
    function JobViewComponent() {
    }
    JobViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jobObservable.subscribe(function (job) {
            _this.job = job;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], JobViewComponent.prototype, "jobObservable", void 0);
    JobViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-job-view',
            templateUrl: './job-view.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], JobViewComponent);
    return JobViewComponent;
}());
exports.JobViewComponent = JobViewComponent;
//# sourceMappingURL=job-view.component.js.map