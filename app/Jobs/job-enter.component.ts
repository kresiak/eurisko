import { Component, Input, Output, OnInit, ViewChild } from '@angular/core'
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

     @ViewChild('descriptionChild') descriptionChild;
     @ViewChild('educationChild') educationChild;
     @ViewChild('requirementsChild') requirementsChild;
     @ViewChild('procedureChild') procedureChild;

    ngOnInit():void
    {
        this.userObservable.subscribe(user => {
            this.userId= user.data._id
        })

        this.jobForm= this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    title: string
    description: string
    education: string
    requirements: string
    procedure: string

    save(formValue, isValid)
    {
        this.dataStore.addData('job.request', {
            title: formValue.title,
            userId: this.userId,
            description: this.description,
            education: this.education,
            requirements: this.requirements,
            procedure: this.procedure,
            isPublished: false
        }).subscribe(res =>
        {
            var x=res;
            this.reset();
        });
    }

    reset()
    {
        this.jobForm.reset();   
        this.descriptionChild.resetContent()  
        this.educationChild.resetContent() 
        this.requirementsChild.resetContent() 
        this.procedureChild.resetContent() 
    }


    descriptionChanged(content) {
        this.description= content
    }

    educationChanged(content) {
        this.education= content
    }

    requirementsChanged(content) {
        this.requirements= content
    }

    procedureChanged(content) {
        this.procedure= content
    }
    
}