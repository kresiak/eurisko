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
var JobListComponent = (function () {
    function JobListComponent() {
        this.path = 'jobs';
        this.stateChanged = new core_1.EventEmitter();
        this.openPanelId = "";
        this.searchControl = new forms_1.FormControl();
        this.searchForm = new forms_1.FormGroup({
            searchControl: new forms_1.FormControl()
        });
    }
    JobListComponent.prototype.stateInit = function () {
        if (!this.state)
            this.state = {};
        if (!this.state.openPanelId)
            this.state.openPanelId = '';
    };
    JobListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateInit();
        Rx_1.Observable.combineLatest(this.jobsObservable, this.searchControl.valueChanges.startWith(''), function (jobs, searchTxt) {
            var txt = searchTxt.trim().toUpperCase();
            if (txt === '' || txt === '*' || txt === '$' || txt === '$>' || txt === '$<')
                return jobs;
            return jobs.filter(function (job) {
                if (txt.startsWith('*PUB')) {
                    return job.data.isPublished;
                }
                if (txt.startsWith('*UNPUB')) {
                    return !job.data.isPublished;
                }
                if (txt.startsWith('*UNREAD')) {
                    return job.annotation.nbUnreadResponses > 0;
                }
                if (txt.startsWith('*')) {
                    return true;
                }
                return job.data.title.toUpperCase().includes(txt) || job.data.description.toUpperCase().includes(txt) || job.data.education.toUpperCase().includes(txt);
            });
        }).subscribe(function (jobs) { return _this.jobs = jobs; });
    };
    JobListComponent.prototype.getJobObservable = function (id) {
        return this.jobsObservable.map(function (jobs) { return jobs.filter(function (s) {
            return s.data._id === id;
        })[0]; });
    };
    // This is typically used for accordions with ngFor, for remembering the open Accordion Panel (see template as well)    
    JobListComponent.prototype.beforeAccordionChange = function ($event) {
        if ($event.nextState) {
            this.state.openPanelId = $event.panelId;
            this.stateChanged.next(this.state);
        }
    };
    ;
    // This is typically used for accordions with ngFor and tabsets in the cild component. As the ngFor disposes and recreates the child component, we need a way to remember the opened tab
    JobListComponent.prototype.childStateChanged = function (newState, objectId) {
        this.state[objectId] = newState;
        this.stateChanged.next(this.state);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], JobListComponent.prototype, "jobsObservable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JobListComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JobListComponent.prototype, "path", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobListComponent.prototype, "stateChanged", void 0);
    JobListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-job-list',
            templateUrl: './job-list.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], JobListComponent);
    return JobListComponent;
}());
exports.JobListComponent = JobListComponent;
//# sourceMappingURL=job-list.component.js.map