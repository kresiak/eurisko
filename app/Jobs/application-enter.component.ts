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

    @Input() ID: Observable<any>
    jobId: string 
    
    ngOnInit():void
    {
            //this.Observable.subscribe(user => {
    //        this.jobId= job.request.data._id
        
      //}

        this.applicationForm= this.formBuilder.group({
            surname: ['', [Validators.required, Validators.minLength(5)]],
            name: ['',[Validators.required, Validators.minLength(3)]]
        });
    }
    
    save(formValue, isValid)
    {
        this.dataStore.addData('job.response', {
            surname: formValue.surname,
            name: formValue.name
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

