import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import {Observable} from 'rxjs/Rx'
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../Shared/Services/job.service'

@Component(
 {
     moduleId: module.id,
     templateUrl: './job-all.routable.component.html'
 }
)
export class JobAllComponentRoutable implements OnInit{
    constructor(private jobService: JobService)    {
        this.searchForm = new FormGroup({
            searchControl: new FormControl()
        });
    }

    jobs: any
    jobsObservable: Observable<any>

    searchControl = new FormControl();
    searchForm;    

    ngOnInit():void{
        Observable.combineLatest(this.jobService.getAnnotatedJobs(), this.searchControl.valueChanges.startWith(''), (jobs, searchTxt: string) => {
            if (searchTxt.trim() === '') return jobs;
            return jobs.filter(job => job.data.title.toUpperCase().includes(searchTxt.toUpperCase()) || job.data.description.toUpperCase().includes(searchTxt.toUpperCase()));
        }).subscribe(jobs => this.jobs = jobs);        
    }
}

