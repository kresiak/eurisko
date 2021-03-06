import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Rx'
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component(
    {
        moduleId: module.id,
        selector: 'gg-application-list',
        templateUrl: './application-list.component.html'
    }
)
export class ApplicationListComponent implements OnInit {
    constructor() {
        this.searchForm = new FormGroup({
            searchControl: new FormControl()
        });
    }

    @Input() applicationsObservable: Observable<any>;
    @Input() state;
    @Input() path: string = 'applications'
    @Output() stateChanged = new EventEmitter();
    applications: any
    openPanelId: string = "";

    private stateInit() {
        if (!this.state) this.state = {};
        if (!this.state.openPanelId) this.state.openPanelId = '';
    }

    searchControl = new FormControl();
    searchForm;

    ngOnInit(): void {
        this.stateInit();

        Observable.combineLatest(this.applicationsObservable, this.searchControl.valueChanges.startWith(''), (applications, searchTxt: string) => {
            let txt: string = searchTxt.trim().toUpperCase();
            if (txt === '' || txt === '*' || txt === '$' || txt === '$>' || txt === '$<') return applications;

            return applications.filter(application => {
                if (txt.startsWith('*UNREAD'))
                {
                    return application.annotation.isUnread
                }                
                if (txt.startsWith('*'))
                {
                    return true
                }                

                if (txt.startsWith('$>') && +txt.slice(2)) {
                    let score = +txt.slice(2);
                    return application.data.piFeedback && +application.data.piFeedback.score  >= score;
                }

                return application.data.citizenship.toUpperCase().includes(txt) || application.data.education.toUpperCase().includes(txt) || application.annotation.candidateFullName.toUpperCase().includes(txt)
                    || application.data.countryOfResidence.toUpperCase().includes(txt) || application.data.address.toUpperCase().includes(txt) || application.data.publications.toUpperCase().includes(txt) 
                    || (application.data.piFeedback && application.data.piFeedback.comment.toUpperCase().includes(txt))
            });
        }).subscribe(applications => this.applications = applications);

    }

    getApplicationObservable(id: string): Observable<any> {
        return this.applicationsObservable.map(applications => applications.filter(s => {
            return s.data._id === id
        }

        )[0]);
    }
    // This is typically used for accordions with ngFor, for remembering the open Accordion Panel (see template as well)    
    private beforeAccordionChange($event: NgbPanelChangeEvent) {
        if ($event.nextState) {
            this.state.openPanelId = $event.panelId;
            this.stateChanged.next(this.state);
        }
    };

    // This is typically used for accordions with ngFor and tabsets in the cild component. As the ngFor disposes and recreates the child component, we need a way to remember the opened tab
    private childStateChanged(newState, objectId) {
        this.state[objectId] = newState;
        this.stateChanged.next(this.state);
    }
}

