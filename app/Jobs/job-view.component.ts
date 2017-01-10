import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { DataStore } from './../Shared/Services/data.service'


@Component(
    {
        template: `<gg-job-view [jobObservable]="jobObservable" [canApply]="true"></gg-job-view>`
    }
)
export class JobViewComponentRoutable implements OnInit {
    constructor(private dataStore: DataStore, private route: ActivatedRoute) {
    }

    @Input() jobObservable: Observable<any>;

    initData(id: string) {
        if (id) {
            this.jobObservable = this.dataStore.getAnnotableDataObservable('job.request').map(jobs => jobs.filter(job => job.data._id === id)[0]);
            this.jobObservable.subscribe(obj => {
                this.job = obj
            })
        }
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.initData(id)
        });
    }

    private job;
}

@Component(
    {
        moduleId: module.id,
        selector: 'gg-job-view',
        templateUrl: './job-view.component.html'
    }
)
export class JobViewComponent implements OnInit {
    constructor(private router: Router) {
    }

    @Input() jobObservable: Observable<any>;
    @Input() canApply: boolean = false

    ngOnInit(): void {
        this.jobObservable.subscribe(job => {
            this.job = job;
        });
    }

    doApply() {
        let link = ['/jobapply', this.job.data._id];
        this.router.navigate(link);
    }

    private job;
}