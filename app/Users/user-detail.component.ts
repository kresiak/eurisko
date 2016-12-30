import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { DataStore } from './../Shared/Services/data.service'
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component(
    {
        moduleId: module.id,
        selector: 'gg-user-detail',
        templateUrl: './user-detail.component.html'
    }
)

export class UserDetailComponent implements OnInit {
    constructor(private dataStore: DataStore) {
    }

    @Input() userObservable: Observable<any>;
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
        this.userObservable.subscribe(user => {
            this.user = user;
            if (user) {
                //this.otpsObservable= this.orderService.getAnnotatedOpenOtpsByCategory(category.data._id)
            }
            
        })
    }

    //private model;
    private user
    //private otpsObservable: Observable<any>;

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