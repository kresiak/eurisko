import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core'
import { DataStore } from './../Shared/Services/data.service'
import { JobService } from '../Shared/Services/job.service'
import { UserService } from './../Shared/Services/user.service'
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

    constructor(private dataStore: DataStore, private jobService: JobService, private formBuilder: FormBuilder, private userService: UserService) {

    }

    @Input() applicationObservable: Observable<any>;
    @Input() state;
    @Input() path: string
    @Input() isRoot: boolean = false
    @Output() stateChanged = new EventEmitter()
    @Input() responseId: string;
    
    private application: any;
    private currentRate: any;

    private stateInit() {
        if (!this.state) this.state = {};
        if (!this.state.selectedTabId) this.state.selectedTabId = '';
    }

    ngOnInit(): void {
        this.stateInit()

        this.applicationViewForm = this.formBuilder.group({
           // piScore: ['', [Validators.required]],
            piRemarque: ['', [Validators.required]]
        })

        this.applicationObservable.subscribe(application => {
            this.application = application;
            this.applicationViewForm.controls['piRemarque'].setValue(this.application && this.application.data && this.application.data.piFeedback ? this.application.data.piFeedback.comment : '')
            this.currentRate= this.application && this.application.data && this.application.data.piFeedback ? this.application.data.piFeedback.score : 0
           // this.applicationViewForm.controls['piScore'].setValue(this.application && this.application.data && this.application.data.piFeedback ? this.application.data.piFeedback.score : '')
        });
      
    }

    setDashlet() {
        this.userService.createApplicationDashletForCurrentUser(this.application.data._id);
    }

    removeDashlet(dashletId) {
        if (dashletId)
            this.userService.removeDashletForCurrentUser(dashletId);
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

    save(formValue, isValid) {
        this.application.data.piFeedback = {
            score: this.currentRate,
            comment: formValue.piRemarque
        }

        this.dataStore.updateData('job.response', this.application.data._id, this.application.data)
    }
}

    @Component({
        selector: 'ngbd-rating-basic',
    })
    export class NgbdRatingBasic {
        currentRate = 8;
    }
