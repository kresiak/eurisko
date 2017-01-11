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

    private createAnnotatedResponse(response, requests) {
        let request= requests.filter(request => request._id === response.jobId)[0]
        return {
            data: response,
            annotation: {
                jobTitle: request ? request.title : 'unknown job request',
                candidateFullName: response.firstName + ' ' + response.name 
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

    getAnnotatedResponses() : Observable<any> {
        return Observable.combineLatest(
            this.dataStore.getDataObservable('job.response'),
            this.dataStore.getDataObservable('job.request'),
            (responses, requests) => {
                return responses.map(response => this.createAnnotatedResponse(response, requests))
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

    getAnnotatedPublishedJobs() : Observable<any> {
        return this.getAnnotatedJobs().map(jobs => jobs.filter(job => job.data.isPublished))
    }


    getAnnotatedResponsesByJobId(jobId: string) : Observable<any> {
        return this.getAnnotatedResponses().map(responses => responses.filter(response => response.data.jobId===jobId))
    }

}