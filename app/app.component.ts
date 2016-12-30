import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './Shared/Services/auth.service'


@Component({
    moduleId: module.id,
    selector: 'giga-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router ) { }

    ngOnInit(): void {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event =>
            {
                var e= <NavigationEnd>event;
                var r= e.urlAfterRedirects === '/' ? '/home' : e.urlAfterRedirects;
                try{
                    this.activateMenu(this.menu.filter(menuitem => menuitem.route===r)[0]);
                }
                finally{}
            }
        );
        this.usersObservable = this.authService.getAnnotatedUsers();
        this.usersObservable.subscribe(users => {
            this.users = users;
            this.initLoginData();
        });
    }

    private initLoginData() {
        this.currentUserId = this.authService.getUserId();
    }

    private usersObservable: Observable<any>;
    private users;
    private currentUserId;

    title = 'Krino';

    menu = [
        {
            route: '/home',
            title: 'Home',
            active: false
        },
        {
            route: '/dashboard',
            title: 'Dashboard',
            active: false
        },
        {
            route: '/myeurisko',
            title: 'My Eurisko',
            active: false
        },
        {
            route: '/jobs',
            title: 'Jobs at Giga',
            active: false
        }
        
        ];

    activateMenu(menuItem) {
        this.menu.forEach(element => {
            element.active = false;
        });
        if (menuItem) menuItem.active = true;
    }

    userSelected(value) {
        this.authService.setUserId(value);
        this.initLoginData();
    }

}

