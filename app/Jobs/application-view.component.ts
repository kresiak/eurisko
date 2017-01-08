import { Component, Input, Output, OnInit, ViewChild } from '@angular/core'
import { DataStore } from './../Shared/Services/data.service'
import { JobService } from '../Shared/Services/job.service'
import { Observable } from 'rxjs/Rx'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
        moduleId: module.id,
        selector: 'gg-application-view',
        templateUrl: './application-view.component.html'    
})

export class ApplicationViewComponent implements OnInit {

    constructor(private dataStore: DataStore, private jobService: JobService) {

    }
 
    @Input() responseId: string;
    private response: any;

    ngOnInit():void
    {
        this.jobService.getAnnotatedResponseById(this.responseId).subscribe(response => {
            this.response = response;
        });

    }

    
    
}
