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
var Rx_1 = require('rxjs/Rx');
var UserService = (function () {
    function UserService(dataStore, authService) {
        this.dataStore = dataStore;
        this.authService = authService;
        this.symJob = 'job';
        this.symApplication = 'application';
        this.symTableDashlets = 'dashlets.eurisko';
    }
    //   CRUD Changes
    //   =============
    UserService.prototype.createDashletForCurrentUser = function (category, id) {
        var _this = this;
        var userId = this.authService.getUserId();
        this.dataStore.getDataObservable(this.symTableDashlets).first().subscribe(function (dashlets) {
            if (dashlets.filter(function (dashlet) { return dashlet.user === userId && dashlet.category === category && dashlet.id === id; }).length === 0) {
                _this.dataStore.addData(_this.symTableDashlets, { userId: userId, category: category, id: id });
            }
        });
    };
    UserService.prototype.removeDashletForCurrentUser = function (dbid) {
        var _this = this;
        this.dataStore.getDataObservable(this.symTableDashlets).map(function (dashlets) { return dashlets.filter(function (dashlet) { return dashlet._id === dbid; }); }).subscribe(function (dashlets) {
            if (dashlets.length > 0) {
                var userId = _this.authService.getUserId();
                var dashlet = dashlets[0];
                if (dashlet.userId === userId) {
                    _this.dataStore.deleteData(_this.symTableDashlets, dbid);
                }
            }
        });
    };
    UserService.prototype.getDashletsForCurrentUser = function () {
        return Rx_1.Observable.combineLatest(this.dataStore.getDataObservable(this.symTableDashlets), this.authService.getUserIdObservable(), function (dashlets, userId) {
            return dashlets.filter(function (dashlet) { return dashlet.userId === userId; });
        });
    };
    // Job specific
    // ============
    UserService.prototype.getJobDashletsForCurrentUser = function () {
        var _this = this;
        return this.getDashletsForCurrentUser().map(function (dashlets) { return dashlets.filter(function (dashlet) { return dashlet.category === _this.symJob; }); });
    };
    UserService.prototype.createJobDashletForCurrentUser = function (jobId) {
        return this.createDashletForCurrentUser(this.symJob, jobId);
    };
    UserService.prototype.isJobDashlet = function (category) {
        return category === this.symJob;
    };
    // Application specific
    // ===============
    UserService.prototype.getApplicationDashletsForCurrentUser = function () {
        var _this = this;
        return this.getDashletsForCurrentUser().map(function (dashlets) { return dashlets.filter(function (dashlet) { return dashlet.category === _this.symApplication; }); });
    };
    UserService.prototype.createApplicationDashletForCurrentUser = function (applicationId) {
        return this.createDashletForCurrentUser(this.symApplication, applicationId);
    };
    UserService.prototype.isApplicationDashlet = function (category) {
        return category === this.symApplication;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(data_service_1.DataStore)),
        __param(1, core_1.Inject(auth_service_1.AuthService)), 
        __metadata('design:paramtypes', [data_service_1.DataStore, auth_service_1.AuthService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map