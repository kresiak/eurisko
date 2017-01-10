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
var forms_1 = require('@angular/forms');
var Rx_1 = require('rxjs/Rx');
var job_service_1 = require('../Shared/Services/job.service');
var JobAllComponentRoutable = (function () {
    function JobAllComponentRoutable(jobService) {
        this.jobService = jobService;
        this.searchControl = new forms_1.FormControl();
        this.searchForm = new forms_1.FormGroup({
            searchControl: new forms_1.FormControl()
        });
    }
    JobAllComponentRoutable.prototype.ngOnInit = function () {
        var _this = this;
        Rx_1.Observable.combineLatest(this.jobService.getAnnotatedJobs(), this.searchControl.valueChanges.startWith(''), function (jobs, searchTxt) {
            if (searchTxt.trim() === '')
                return jobs;
            return jobs.filter(function (job) { return job.data.title.toUpperCase().includes(searchTxt.toUpperCase()) || job.data.description.toUpperCase().includes(searchTxt.toUpperCase()); });
        }).subscribe(function (jobs) { return _this.jobs = jobs; });
    };
    JobAllComponentRoutable = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './job-all.routable.component.html'
        }), 
        __metadata('design:paramtypes', [job_service_1.JobService])
    ], JobAllComponentRoutable);
    return JobAllComponentRoutable;
}());
exports.JobAllComponentRoutable = JobAllComponentRoutable;
//# sourceMappingURL=job-all.routable.component.js.map