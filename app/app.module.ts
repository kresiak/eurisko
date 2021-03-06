import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartistModule, ChartistComponent} from 'angular2-chartist';

import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll/ng2-simple-page-scroll';

import { AppComponent } from './app.component'
import { HomeComponent} from './home.component'

import {DashboardComponent} from './Dashboard/dashboard.component'
import {DashletComponent} from './Dashboard/dashlet.component'

import {JobEnterComponent} from './Jobs/job-enter.component'
import {JobDetailComponent} from './Jobs/job-detail.component'
import {JobListComponent} from './Jobs/job-list.component'
import {JobAllComponentRoutable} from './Jobs/job-all.routable.component'
import {UserDetailComponent} from './Users/user-detail.component'
import {CurrentUserDetailComponentRoutable} from './Users/current-user-detail.routable.component'
import {JobViewComponent, JobViewComponentRoutable} from './Jobs/job-view.component'
import {ApplicationEnterComponent, ApplicationEnterComponentRoutable} from './Jobs/application-enter.component'
import {ApplicationDetailComponent} from './Jobs/application-detail.component' 
import {ApplicationListComponent} from './Jobs/application-list.component'

import {SimpleTinyComponent} from './ui/editor/editor-wysiwyg'
import {Editor} from './ui/editor/editor'
import {EditorNumber} from './ui/editor/editor-number'
import {EditorDate} from './ui/editor/editor-date'
import {EditorBoolean} from './ui/editor/editor-boolean'
import {EditorTinyMce} from './ui/editor/editor-tnymce'
import {Checkbox} from './ui/checkbox/checkbox'
import {SelectorComponent} from './ui/selector/selector.component'
import {CommentComponent} from './Comments/comment.component'
import {CommentsComponent} from './Comments/comments.component'

import {ApiService} from './Shared/Services/api.service'
import {JobService} from './Shared/Services/job.service'
import {DataStore} from './Shared/Services/data.service';
import {AuthService} from './Shared/Services/auth.service'
import {UserService} from './Shared/Services/user.service'
import {FullDatePipe} from './Shared/Pipes/fulldate.pipe'
import {ShortDatePipe} from './Shared/Pipes/shortdate.pipe'
import {FromNowPipe} from './Shared/Pipes/fromnow.pipe'


//import {MomentModule} from 'angular2-moment';

@NgModule({
  imports:      [ 
  //        MomentModule,
          ChartistModule,
          BrowserModule, 
          FormsModule, ReactiveFormsModule,
          HttpModule,
          NgbModule.forRoot(),
          Ng2SimplePageScrollModule.forRoot(),
          RouterModule.forRoot([
            { path: "jobs", component: JobAllComponentRoutable},
            { path: "myeurisko", component: CurrentUserDetailComponentRoutable},
            { path: "dashboard", component: DashboardComponent},
            { path: "home", component: HomeComponent},
            { path: "jobview/:id", component: JobViewComponentRoutable},
            { path: "jobapply/:id", component: ApplicationEnterComponentRoutable},            
            { path: "", component: HomeComponent, pathMatch: 'full'},
            { path: '**', redirectTo: '/home'}
          ])
   ],
  declarations: [ AppComponent, HomeComponent, 
                  CommentComponent, CommentsComponent,
                  JobEnterComponent, JobViewComponent, JobViewComponentRoutable, JobListComponent, JobDetailComponent, JobAllComponentRoutable,
                  ApplicationEnterComponent, ApplicationDetailComponent,ApplicationEnterComponentRoutable, ApplicationListComponent,
                  UserDetailComponent, CurrentUserDetailComponentRoutable,
                  Editor, EditorNumber, EditorDate, EditorBoolean, Checkbox, SelectorComponent, SimpleTinyComponent,EditorTinyMce,
                  FullDatePipe, ShortDatePipe, FromNowPipe,
                  DashboardComponent, DashletComponent
                 ],
  providers:    [ ApiService, DataStore, AuthService, JobService, UserService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
