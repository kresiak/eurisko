import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { DataStore } from './../Shared/Services/data.service'
import { JobService } from '../Shared/Services/job.service'
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component(
    {
        moduleId: module.id,
        selector: 'gg-user-detail',
        templateUrl: './user-detail.component.html'
    }
)

export class UserDetailComponent implements OnInit {
    constructor(private dataStore: DataStore, private jobService: JobService) {
    }

    @Input() userObservable: Observable<any>;
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

        this.userObservable.subscribe(user => {
            this.user = user;
            if (user) {
                this.annotatedJobsObservable = this.jobService.getAnnotatedJobsByUserId(user.data._id)
                this.annotatedJobsObservable.subscribe(jobs => {
                    this.hasJobRequests= jobs && jobs.length > 0
                })
            }
        })
    }

    //private model;
    private user
    private annotatedJobsObservable: Observable<any>
    private hasJobRequests: boolean= false


    commentsUpdated(comments) {
        if (this.user && comments) {
            this.user.data.comments = comments;
            this.dataStore.updateData('users.eurisko', this.user.data._id, this.user.data);
        }
    }

    emailUpdated(email: string) {
        this.user.data.email = email;
        this.dataStore.updateData('users.eurisko', this.user.data._id, this.user.data);
    }

    public beforeTabChange($event: NgbTabChangeEvent) {
        this.state.selectedTabId = $event.nextId;
        this.stateChanged.next(this.state);
    };

    private childProductsStateChanged($event) {
        this.state.Products = $event;
        this.stateChanged.next(this.state);
    }

}