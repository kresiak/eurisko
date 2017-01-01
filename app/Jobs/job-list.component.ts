import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import {Observable} from 'rxjs/Rx'
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component(
 {
     moduleId: module.id,
     selector: 'gg-job-list',
     templateUrl: './job-list.component.html'
 }
)
export class JobListComponent implements OnInit{
    constructor()    {
        this.searchForm = new FormGroup({
            searchControl: new FormControl()
        });
    }

    @Input() jobsObservable: Observable<any>;
    @Input() state;
    @Input() path: string= 'jobs'
    @Output() stateChanged= new EventEmitter();
    jobs: any
    openPanelId: string= "";
    
    private stateInit()
    {
        if (!this.state) this.state= {};
        if (!this.state.openPanelId) this.state.openPanelId = '';
    }

    searchControl = new FormControl();
    searchForm;    

    ngOnInit():void{
        this.stateInit();

        Observable.combineLatest(this.jobsObservable, this.searchControl.valueChanges.startWith(''), (jobs, searchTxt: string) => {
            if (searchTxt.trim() === '') return jobs;
            return jobs.filter(job => job.data.title.toUpperCase().includes(searchTxt.toUpperCase()) || job.data.description.toUpperCase().includes(searchTxt.toUpperCase()));
        }).subscribe(jobs => this.jobs = jobs);
        
    }

    getJobObservable(id: string) : Observable<any>
    {
        return this.jobsObservable.map(jobs=> jobs.filter(s => {
            return s.data._id===id
        }

        )[0]);
    }
    // This is typically used for accordions with ngFor, for remembering the open Accordion Panel (see template as well)    
    private beforeAccordionChange($event: NgbPanelChangeEvent) {
        if ($event.nextState)
        {
            this.state.openPanelId = $event.panelId;
            this.stateChanged.next(this.state);
        }            
    };
    
    // This is typically used for accordions with ngFor and tabsets in the cild component. As the ngFor disposes and recreates the child component, we need a way to remember the opened tab
    private childStateChanged(newState, objectId)
    {
            this.state[objectId]= newState;
            this.stateChanged.next(this.state);
    }


    
}

