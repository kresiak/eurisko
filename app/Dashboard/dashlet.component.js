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
var user_service_1 = require('../Shared/Services/user.service');
var job_service_1 = require('../Shared/Services/job.service');
var DashletComponent = (function () {
    function DashletComponent(userService, jobService) {
        this.userService = userService;
        this.jobService = jobService;
    }
    DashletComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isJobDashlet()) {
            this.dataObservable = this.jobService.getAnnotatedJobById(this.id);
        }
        if (this.isApplicationDashlet()) {
            this.dataObservable = this.jobService.getAnnotatedResponseById(this.id);
        }
        this.dataObservable.subscribe(function (x) {
            _this.dataObject = x;
        });
    };
    DashletComponent.prototype.isJobDashlet = function () {
        return this.userService.isJobDashlet(this.category);
    };
    DashletComponent.prototype.isApplicationDashlet = function () {
        return this.userService.isApplicationDashlet(this.category);
    };
    DashletComponent.prototype.getTitle = function () {
        if (this.isJobDashlet())
            return 'Position: ' + this.dataObject.data.title;
        if (this.isApplicationDashlet())
            return 'Candidate: ' + this.dataObject.annotation.candidateFullName;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashletComponent.prototype, "category", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashletComponent.prototype, "id", void 0);
    DashletComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-dashlet',
            templateUrl: './dashlet.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, job_service_1.JobService])
    ], DashletComponent);
    return DashletComponent;
}());
exports.DashletComponent = DashletComponent;
//# sourceMappingURL=dashlet.component.js.map