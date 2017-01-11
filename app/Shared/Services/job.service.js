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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var data_service_1 = require('./data.service');
var auth_service_1 = require('./auth.service');
var user_service_1 = require('./user.service');
var Rx_1 = require('rxjs/Rx');
core_1.Injectable();
var JobService = (function () {
    function JobService(dataStore, authService, userService) {
        this.dataStore = dataStore;
        this.authService = authService;
        this.userService = userService;
    }
    // jobs
    // ======
    JobService.prototype.createAnnotatedJob = function (job, users, responses, dashlets) {
        var user = users.filter(function (user) { return user._id === job.userId; })[0];
        var myresponses = responses.filter(function (response) { return response.jobId === job._id; });
        var myUnreadResponses = myresponses.filter(function (response) { return !response.piFeedback; });
        var dashlet = dashlets.filter(function (dashlet) { return dashlet.id === job._id; });
        return {
            data: job,
            annotation: {
                user: user ? user.firstName + ' ' + user.name : 'unknown user',
                nbResponses: myresponses.length,
                nbUnreadResponses: myUnreadResponses.length,
                dashletId: dashlet.length > 0 ? dashlet[0]._id : undefined
            }
        };
    };
    JobService.prototype.createAnnotatedResponse = function (response, requests, dashlets) {
        var request = requests.filter(function (request) { return request._id === response.jobId; })[0];
        var dashlet = dashlets.filter(function (dashlet) { return dashlet.id === response._id; });
        return {
            data: response,
            annotation: {
                jobTitle: request ? request.title : 'unknown job request',
                candidateFullName: response.firstName + ' ' + response.name,
                isUnread: !response.piFeedback,
                dashletId: dashlet.length > 0 ? dashlet[0]._id : undefined
            }
        };
    };
    JobService.prototype.getAnnotatedJobs = function () {
        var _this = this;
        return Rx_1.Observable.combineLatest(this.dataStore.getDataObservable('job.request'), this.dataStore.getDataObservable('users.eurisko'), this.dataStore.getDataObservable('job.response'), this.userService.getJobDashletsForCurrentUser(), function (jobs, users, responses, dashlets) {
            return jobs.map(function (job) { return _this.createAnnotatedJob(job, users, responses, dashlets); });
        });
    };
    JobService.prototype.getAnnotatedResponses = function () {
        var _this = this;
        return Rx_1.Observable.combineLatest(this.dataStore.getDataObservable('job.response'), this.dataStore.getDataObservable('job.request'), this.userService.getApplicationDashletsForCurrentUser(), function (responses, requests, dashlets) {
            return responses.map(function (response) { return _this.createAnnotatedResponse(response, requests, dashlets); });
        });
    };
    JobService.prototype.getAnnotatedJobsOfCurrentUser = function () {
        return Rx_1.Observable.combineLatest(this.getAnnotatedJobs(), this.authService.getUserIdObservable(), function (jobs, userId) {
            return jobs.filter(function (job) { return job.data.userId === userId; });
        });
    };
    JobService.prototype.getAnnotatedJobsByUserId = function (userId) {
        return this.getAnnotatedJobs().map(function (jobs) { return jobs.filter(function (job) { return job.data.userId === userId; }); });
    };
    JobService.prototype.getAnnotatedPublishedJobs = function () {
        return this.getAnnotatedJobs().map(function (jobs) { return jobs.filter(function (job) { return job.data.isPublished; }); });
    };
    JobService.prototype.getAnnotatedResponsesByJobId = function (jobId) {
        return this.getAnnotatedResponses().map(function (responses) { return responses.filter(function (response) { return response.data.jobId === jobId; }); });
    };
    JobService.prototype.getAnnotatedResponseById = function (responseId) {
        return this.getAnnotatedResponses().map(function (responses) { return responses.filter(function (response) { return response.data._id === responseId; })[0]; });
    };
    JobService.prototype.getAnnotatedJobById = function (jobId) {
        return this.getAnnotatedJobs().map(function (jobs) { return jobs.filter(function (job) { return job.data._id === jobId; })[0]; });
    };
    JobService = __decorate([
        __param(0, core_1.Inject(data_service_1.DataStore)),
        __param(1, core_1.Inject(auth_service_1.AuthService)),
        __param(2, core_1.Inject(user_service_1.UserService)), 
        __metadata('design:paramtypes', [data_service_1.DataStore, auth_service_1.AuthService, user_service_1.UserService])
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map