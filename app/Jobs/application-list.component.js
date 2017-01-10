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
var ApplicationListComponent = (function () {
    function ApplicationListComponent() {
        this.path = 'applications';
        this.stateChanged = new core_1.EventEmitter();
        this.openPanelId = "";
        this.searchControl = new forms_1.FormControl();
        this.searchForm = new forms_1.FormGroup({
            searchControl: new forms_1.FormControl()
        });
    }
    ApplicationListComponent.prototype.stateInit = function () {
        if (!this.state)
            this.state = {};
        if (!this.state.openPanelId)
            this.state.openPanelId = '';
    };
    ApplicationListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stateInit();
        Rx_1.Observable.combineLatest(this.applicationsObservable, this.searchControl.valueChanges.startWith(''), function (applications, searchTxt) {
            if (searchTxt.trim() === '')
                return applications;
            return applications.filter(function (application) { return application.data.citizenship.toUpperCase().includes(searchTxt.toUpperCase()) || application.data.education.toUpperCase().includes(searchTxt.toUpperCase()); });
        }).subscribe(function (applications) { return _this.applications = applications; });
    };
    ApplicationListComponent.prototype.getApplicationObservable = function (id) {
        return this.applicationsObservable.map(function (applications) { return applications.filter(function (s) {
            return s.data._id === id;
        })[0]; });
    };
    // This is typically used for accordions with ngFor, for remembering the open Accordion Panel (see template as well)    
    ApplicationListComponent.prototype.beforeAccordionChange = function ($event) {
        if ($event.nextState) {
            this.state.openPanelId = $event.panelId;
            this.stateChanged.next(this.state);
        }
    };
    ;
    // This is typically used for accordions with ngFor and tabsets in the cild component. As the ngFor disposes and recreates the child component, we need a way to remember the opened tab
    ApplicationListComponent.prototype.childStateChanged = function (newState, objectId) {
        this.state[objectId] = newState;
        this.stateChanged.next(this.state);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], ApplicationListComponent.prototype, "applicationsObservable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ApplicationListComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ApplicationListComponent.prototype, "path", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ApplicationListComponent.prototype, "stateChanged", void 0);
    ApplicationListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-application-list',
            templateUrl: './application-list.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationListComponent);
    return ApplicationListComponent;
}());
exports.ApplicationListComponent = ApplicationListComponent;
//# sourceMappingURL=application-list.component.js.map