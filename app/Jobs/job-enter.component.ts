import { Component, Input, Output, OnInit } from '@angular/core'
import { DataStore } from './../Shared/Services/data.service'
import { Observable } from 'rxjs/Rx'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
        moduleId: module.id,
        selector: 'gg-job-enter',
        templateUrl: './job-enter.component.html'    
})
export class JobEnterComponent implements OnInit {
    private jobForm: FormGroup;

    constructor(private dataStore: DataStore, private formBuilder: FormBuilder) {

    }

    @Input() userObservable: Observable<any>
    userId: string

    ngOnInit():void
    {
        this.userObservable.subscribe(user => {
            this.userId= user.data._id
        })

        this.jobForm= this.formBuilder.group({
            description: ['', [Validators.required, Validators.minLength(5)]],
            education: ['', Validators.required],
            requirements: ['', Validators.required],
            procedure: ['', Validators.required],
        });
    }


    save(formValue, isValid)
    {
        this.dataStore.addData('job.request', {
            userId: this.userId,
            description: formValue.description,
            education: formValue.education,
            requirements: formValue.requirements,
            procedure: formValue.procedure
        }).subscribe(res =>
        {
            var x=res;
            this.reset();
        });
    }

    reset()
    {
        this.jobForm.reset();        
    }
}