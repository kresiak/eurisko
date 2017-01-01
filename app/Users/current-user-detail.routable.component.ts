import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core'
import { AuthService } from '../Shared/Services/auth.service'
import { Observable } from 'rxjs/Rx'

@Component(
    {
        moduleId: module.id,
        templateUrl: './current-user-detail.routable.component.html'
    }
)
export class CurrentUserDetailComponentRoutable implements OnInit {
    constructor(private authService: AuthService) { }

    currentUser: any
    state: {}


    currentUserObservable: Observable<any>

    initData() {
        this.currentUserObservable= this.authService.getAnnotatedCurrentUser()
        this.currentUserObservable.subscribe(user => {
            this.currentUser= user
        })
    }

    ngOnInit(): void {        
        this.initData()
    }

}
