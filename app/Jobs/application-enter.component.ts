import { Component, Input, Output, OnInit, ViewChild } from '@angular/core'
import { DataStore } from './../Shared/Services/data.service'
import { Observable } from 'rxjs/Rx'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
        moduleId: module.id,
        selector: 'gg-application-enter',
        templateUrl: './application-enter.component.html'    
})
export class ApplicationEnterComponent implements OnInit {
    private applicationForm: FormGroup;

    constructor(private dataStore: DataStore, private formBuilder: FormBuilder) {

    }
 
    @Input() jobId: string;
    
    ngOnInit():void
    {
          
        this.applicationForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            age: ['', [Validators.required]],
            citizenship: ['', [Validators.required]],
            address: ['', [Validators.required]],
            email: ['', [Validators.required]],
            telephone: ['', [Validators.required]],
            countryOfResidence: ['', [Validators.required]],
            education: ['', [Validators.required]],
            publications: ['', [Validators.required]],
            presentOccupation: ['', [Validators.required]]
        });
    }
    
    save(formValue, isValid)
    {
        this.dataStore.addData('job.response', {
            'jobId' : this.jobId, 
            name: formValue.name,
            firstName: formValue.firstName,
            age: formValue.age,
            citizenship: formValue.citizenship,
            address: formValue.address,
            email: formValue.email,
            telephone: formValue.telephone,
            countryOfResidence: formValue.countryOfResidence,
            education: formValue.education,
            publications: formValue.publications,
            presentOccupation: formValue.presentOccupation
        }).subscribe(res =>
        {
            var x = res;
            this.reset();
        });
    }

    reset()
    {
        this.applicationForm.reset();   
    }
}
