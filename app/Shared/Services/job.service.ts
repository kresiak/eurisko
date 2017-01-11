import { Injectable, Inject } from '@angular/core'
import { DataStore } from './data.service'
import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { SelectableData } from './../Classes/selectable-data'
import { Observable } from 'rxjs/Rx'


Injectable()
export class JobService {
    constructor( @Inject(DataStore) private dataStore: DataStore, @Inject(AuthService) private authService: AuthService, @Inject(UserService) private userService: UserService) { }

    // jobs
    // ======

    private createAnnotatedJob(job, users, responses, dashlets) {
        let user= users.filter(user => user._id === job.userId)[0]
        let myresponses= responses.filter(response => response.jobId===job._id)
        let myUnreadResponses= myresponses.filter(response => !response.piFeedback)
        let dashlet = dashlets.filter(dashlet => dashlet.id === job._id);
        return {
            data: job,
            annotation: {
                user: user ? user.firstName + ' ' + user.name : 'unknown user',
                nbResponses: myresponses.length,
                nbUnreadResponses: myUnreadResponses.length,
                dashletId: dashlet.length > 0 ? dashlet[0]._id : undefined
            }
        }
    }

    private createAnnotatedResponse(response, requests, dashlets) {
        let request= requests.filter(request => request._id === response.jobId)[0]
        let dashlet = dashlets.filter(dashlet => dashlet.id === response._id);
        return {
            data: response,
            annotation: {
                jobTitle: request ? request.title : 'unknown job request',
                candidateFullName: response.firstName + ' ' + response.name,
                isUnread: !response.piFeedback,
                dashletId: dashlet.length > 0 ? dashlet[0]._id : undefined 
            }
        }
    }

    getAnnotatedJobs() : Observable<any> {
        return Observable.combineLatest(
            this.dataStore.getDataObservable('job.request'),
            this.dataStore.getDataObservable('users.eurisko'),
            this.dataStore.getDataObservable('job.response'),  
            this.userService.getJobDashletsForCurrentUser(),          
            (jobs, users, responses, dashlets) => {
                return jobs.map(job => this.createAnnotatedJob(job, users, responses, dashlets))
            });        
    }

    getAnnotatedResponses() : Observable<any> {
        return Observable.combineLatest(
            this.dataStore.getDataObservable('job.response'),
            this.dataStore.getDataObservable('job.request'),
            this.userService.getApplicationDashletsForCurrentUser(),          
            (responses, requests, dashlets) => {
                return responses.map(response => this.createAnnotatedResponse(response, requests, dashlets))
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

    getAnnotatedResponseById(responseId: string) : Observable<any> {
        return this.getAnnotatedResponses().map(responses => responses.filter(response => response.data._id===responseId)[0])
    }

    getAnnotatedJobById(jobId: string) : Observable<any> {
        return this.getAnnotatedJobs().map(jobs => jobs.filter(job => job.data._id===jobId)[0])
    }

}