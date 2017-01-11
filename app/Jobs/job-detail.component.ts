import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { DataStore } from './../Shared/Services/data.service'
import { UserService } from './../Shared/Services/user.service'
import { JobService } from './../Shared/Services/job.service'
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as moment from "moment"


@Component(
    {
        moduleId: module.id,
        selector: 'gg-job-detail',
        templateUrl: './job-detail.component.html'
    }
)

export class JobDetailComponent implements OnInit {
    constructor(private dataStore: DataStore, private jobService: JobService, private userService: UserService) {
    }

    @Input() jobObservable: Observable<any>;
    @Input() state;
    @Input() path: string
    @Input() isRoot: boolean = false
    @Output() stateChanged = new EventEmitter()

    private stateInit() {
        if (!this.state) this.state = {};
        if (!this.state.selectedTabId) this.state.selectedTabId = '';
    }

    ngOnInit(): void {
        this.stateInit();
        this.jobObservable.subscribe(job => {
            this.job = job;
            if (job) {
                this.applicationsObservable = this.jobService.getAnnotatedResponsesByJobId(job.data._id)
            }
        })
    }

    //private model;
    private job
    private applicationsObservable: Observable<any>

    setDashlet() {
        this.userService.createJobDashletForCurrentUser(this.job.data._id);
    }

    removeDashlet(dashletId) {
        if (dashletId)
            this.userService.removeDashletForCurrentUser(dashletId);
    }

    commentsUpdated(comments) {
        if (this.job && comments) {
            this.job.data.comments = comments;
            this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
        }
    }

    public beforeTabChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'tabMax') {
            $event.preventDefault();
            //this.navigationService.maximizeOrUnmaximize('/job', this.job.data._id, this.path, this.isRoot)
        }
        if ($event.nextId === 'gotoTop') {
            $event.preventDefault();
            //this.navigationService.jumpToTop()
            return
        }

        this.state.selectedTabId = $event.nextId;
        this.stateChanged.next(this.state);
    };

    private childResponsesStateChanged($event) {
        this.state.Responses = $event;
        this.stateChanged.next(this.state);
    }

    private titleChanged(title) {
        this.job.data.title = title
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    }

    private publishedUpdated(isPublished) {
        this.job.data.isPublished = isPublished
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    }

    private descriptionChanged(description) {
        this.job.data.description = description
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    }

    private educationChanged(education) {
        this.job.data.education = education
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    }

    private procedureChanged(procedure) {
        this.job.data.procedure = procedure
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    }

    private requirementsChanged(requirements) {
        this.job.data.requirements = requirements
        this.dataStore.updateData('job.request', this.job.data._id, this.job.data);
    }

}