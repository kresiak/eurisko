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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var auth_service_1 = require('./Shared/Services/auth.service');
var AppComponent = (function () {
    function AppComponent(authService, route, router) {
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.title = 'Krino';
        this.menu = [
            {
                route: '/home',
                title: 'Home',
                active: false
            },
            {
                route: '/dashboard',
                title: 'Dashboard',
                active: false
            },
            {
                route: '/myeurisko',
                title: 'My Eurisko',
                active: false
            },
            {
                route: '/jobs',
                title: 'Jobs at Giga',
                active: false
            }
        ];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; }).subscribe(function (event) {
            var e = event;
            var r = e.urlAfterRedirects === '/' ? '/home' : e.urlAfterRedirects;
            try {
                _this.activateMenu(_this.menu.filter(function (menuitem) { return menuitem.route === r; })[0]);
            }
            finally { }
        });
        this.usersObservable = this.authService.getAnnotatedUsers();
        this.usersObservable.subscribe(function (users) {
            _this.users = users;
            _this.initLoginData();
        });
    };
    AppComponent.prototype.initLoginData = function () {
        this.currentUserId = this.authService.getUserId();
    };
    AppComponent.prototype.activateMenu = function (menuItem) {
        this.menu.forEach(function (element) {
            element.active = false;
        });
        if (menuItem)
            menuItem.active = true;
    };
    AppComponent.prototype.userSelected = function (value) {
        this.authService.setUserId(value);
        this.initLoginData();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'giga-app',
            templateUrl: './app.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map