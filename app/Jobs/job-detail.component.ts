import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { DataStore } from './../Shared/Services/data.service'
import {JobService} from './../Shared/Services/job.service'
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
    constructor(private dataStore: DataStore, private jobService: JobService) {
    }

    @Input() jobObservable: Observable<any>;
    @Input() state;
    @Input() path: string
    @Input() isRoot: boolean= false
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
                this.applicationsObservable= this.jobService.getAnnotatedResponsesByJobId(job.data._id)
            }            
        })
    }

    //private model;
    private job
    private applicationsObservable : Observable<any> 

    commentsUpdated(comments) {
        if (this.job && comments) {
            this.job.data.comments = comments;
            this.dataStore.updateData('categories', this.job.data._id, this.job.data);
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


}