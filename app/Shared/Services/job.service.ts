import { Injectable, Inject } from '@angular/core'
import { DataStore } from './data.service'
import { AuthService } from './auth.service'
import { SelectableData } from './../Classes/selectable-data'
import { Observable } from 'rxjs/Rx'


Injectable()
export class JobService {
    constructor( @Inject(DataStore) private dataStore: DataStore, @Inject(AuthService) private authService: AuthService) { }

    // jobs
    // ======

    private createAnnotatedJob(job, users) {
        let user= users.filter(user => user._id === job.userId)[0]
        return {
            data: job,
            annotation: {
                user: user ? user.firstName + ' ' + user.name : 'unknown user'
            }
        }
    }

    getAnnotatedJobs() : Observable<any> {
        return Observable.combineLatest(
            this.dataStore.getDataObservable('job.request'),
            this.dataStore.getDataObservable('users.eurisko'),
            (jobs, users) => {
                return jobs.map(job => this.createAnnotatedJob(job, users))
            });        
    }

    getAnnotatedJobsOfCurrentUser() : Observable<any> {
        return Observable.combineLatest(this.getAnnotatedJobs(), this.authService.getUserIdObservable(), (jobs, userId) => {
            return jobs.filter(job => job.data.userId===userId)
        })
    }

    getAnnotatedJobsByUserId(userId: string) : Observable<any> {
        return this.getAnnotatedJobs().map(jobs => jobs.filter(job => job.data.userId===userId))
    }
}