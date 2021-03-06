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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var angular2_chartist_1 = require('angular2-chartist');
var ng2_simple_page_scroll_1 = require('ng2-simple-page-scroll/ng2-simple-page-scroll');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home.component');
var dashboard_component_1 = require('./Dashboard/dashboard.component');
var dashlet_component_1 = require('./Dashboard/dashlet.component');
var job_enter_component_1 = require('./Jobs/job-enter.component');
var job_detail_component_1 = require('./Jobs/job-detail.component');
var job_list_component_1 = require('./Jobs/job-list.component');
var job_all_routable_component_1 = require('./Jobs/job-all.routable.component');
var user_detail_component_1 = require('./Users/user-detail.component');
var current_user_detail_routable_component_1 = require('./Users/current-user-detail.routable.component');
var job_view_component_1 = require('./Jobs/job-view.component');
var application_enter_component_1 = require('./Jobs/application-enter.component');
var application_detail_component_1 = require('./Jobs/application-detail.component');
var application_list_component_1 = require('./Jobs/application-list.component');
var editor_wysiwyg_1 = require('./ui/editor/editor-wysiwyg');
var editor_1 = require('./ui/editor/editor');
var editor_number_1 = require('./ui/editor/editor-number');
var editor_date_1 = require('./ui/editor/editor-date');
var editor_boolean_1 = require('./ui/editor/editor-boolean');
var editor_tnymce_1 = require('./ui/editor/editor-tnymce');
var checkbox_1 = require('./ui/checkbox/checkbox');
var selector_component_1 = require('./ui/selector/selector.component');
var comment_component_1 = require('./Comments/comment.component');
var comments_component_1 = require('./Comments/comments.component');
var api_service_1 = require('./Shared/Services/api.service');
var job_service_1 = require('./Shared/Services/job.service');
var data_service_1 = require('./Shared/Services/data.service');
var auth_service_1 = require('./Shared/Services/auth.service');
var user_service_1 = require('./Shared/Services/user.service');
var fulldate_pipe_1 = require('./Shared/Pipes/fulldate.pipe');
var shortdate_pipe_1 = require('./Shared/Pipes/shortdate.pipe');
var fromnow_pipe_1 = require('./Shared/Pipes/fromnow.pipe');
//import {MomentModule} from 'angular2-moment';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                //        MomentModule,
                angular2_chartist_1.ChartistModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ng2_simple_page_scroll_1.Ng2SimplePageScrollModule.forRoot(),
                router_1.RouterModule.forRoot([
                    { path: "jobs", component: job_all_routable_component_1.JobAllComponentRoutable },
                    { path: "myeurisko", component: current_user_detail_routable_component_1.CurrentUserDetailComponentRoutable },
                    { path: "dashboard", component: dashboard_component_1.DashboardComponent },
                    { path: "home", component: home_component_1.HomeComponent },
                    { path: "jobview/:id", component: job_view_component_1.JobViewComponentRoutable },
                    { path: "jobapply/:id", component: application_enter_component_1.ApplicationEnterComponentRoutable },
                    { path: "", component: home_component_1.HomeComponent, pathMatch: 'full' },
                    { path: '**', redirectTo: '/home' }
                ])
            ],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent,
                comment_component_1.CommentComponent, comments_component_1.CommentsComponent,
                job_enter_component_1.JobEnterComponent, job_view_component_1.JobViewComponent, job_view_component_1.JobViewComponentRoutable, job_list_component_1.JobListComponent, job_detail_component_1.JobDetailComponent, job_all_routable_component_1.JobAllComponentRoutable,
                application_enter_component_1.ApplicationEnterComponent, application_detail_component_1.ApplicationDetailComponent, application_enter_component_1.ApplicationEnterComponentRoutable, application_list_component_1.ApplicationListComponent,
                user_detail_component_1.UserDetailComponent, current_user_detail_routable_component_1.CurrentUserDetailComponentRoutable,
                editor_1.Editor, editor_number_1.EditorNumber, editor_date_1.EditorDate, editor_boolean_1.EditorBoolean, checkbox_1.Checkbox, selector_component_1.SelectorComponent, editor_wysiwyg_1.SimpleTinyComponent, editor_tnymce_1.EditorTinyMce,
                fulldate_pipe_1.FullDatePipe, shortdate_pipe_1.ShortDatePipe, fromnow_pipe_1.FromNowPipe,
                dashboard_component_1.DashboardComponent, dashlet_component_1.DashletComponent
            ],
            providers: [api_service_1.ApiService, data_service_1.DataStore, auth_service_1.AuthService, job_service_1.JobService, user_service_1.UserService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map