import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core'
import { DataStore } from './../Shared/Services/data.service'
import { JobService } from '../Shared/Services/job.service'
import { Observable } from 'rxjs/Rx'
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
        moduleId: module.id,
        selector: 'gg-application-detail',
        templateUrl: './application-detail.component.html'    
})

export class ApplicationDetailComponent implements OnInit {
private applicationViewForm: FormGroup;

    constructor(private dataStore: DataStore, private jobService: JobService, private formBuilder: FormBuilder) {

    }
 
    @Input() applicationObservable: Observable<any>;
    @Input() state;
    @Input() path: string
    @Input() isRoot: boolean= false
    @Output() stateChanged = new EventEmitter()
    @Input() responseId: string;
 //   private response: any;
    private application: any;

    private stateInit() {
        if (!this.state) this.state = {};
        if (!this.state.selectedTabId) this.state.selectedTabId = '';
    }

    ngOnInit():void
    {
        this.stateInit()
        this.applicationObservable.subscribe(application => {
            this.application = application;
        });

        this.applicationViewForm = this.formBuilder.group({
            piScore: ['', [Validators.required]],
            piRemarque: ['', [Validators.required]]
        });

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
    
    save(formValue, isValid)
    {
        this.application.data.piFeedback = {
            score: formValue.piScore,
            comment: formValue.piRemarque
        }  

        this.dataStore.updateData('job.response', this.application.data._id, this.application.data )
    }
}
