import { Component, Input, OnInit } from '@angular/core'
import { UserService } from '../Shared/Services/user.service'
import { JobService } from '../Shared/Services/job.service'
import { Observable } from 'rxjs/Rx'

@Component(
    {
        moduleId: module.id,
        selector: 'gg-dashlet',
        templateUrl: './dashlet.component.html'
    }
)
export class DashletComponent implements OnInit {
    constructor(private userService: UserService, private jobService: JobService) {

    }

    @Input() category: string;
    @Input() id: string;

    ngOnInit(): void {
        if (this.isJobDashlet()) {
            this.dataObservable = this.jobService.getAnnotatedJobById(this.id);
        }

        if (this.isApplicationDashlet()) {
            this.dataObservable = this.jobService.getAnnotatedResponseById(this.id);
        }

        this.dataObservable.subscribe(x => {
            this.dataObject = x;
        });

    }

    private dataObservable: Observable<any>;
    private dataObject: any;

    private isJobDashlet() {
        return this.userService.isJobDashlet(this.category);
    }

    private isApplicationDashlet() {
        return this.userService.isApplicationDashlet(this.category);
    }


    private getTitle(): string {
        if (this.isJobDashlet()) return 'Position: ' + this.dataObject.data.title;
        if (this.isApplicationDashlet()) return 'Candidate: ' + this.dataObject.annotation.candidateFullName;
    }

}