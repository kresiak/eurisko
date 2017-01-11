import { Injectable, Inject } from '@angular/core'
import { DataStore } from './data.service'
import { Observable, BehaviorSubject } from 'rxjs/Rx'
import { SelectableData } from './../Classes/selectable-data'


@Injectable()
export class AuthService {
    constructor( @Inject(DataStore) private dataStore: DataStore) { }

    private currentUserId='5865621996b3bd2c99c54948';

    private currentUserIdObservable= new BehaviorSubject(this.currentUserId);

    private createAnnotatedUser(user, jobs, responses) {
        if (!user) return null;
        let myJobs= jobs.filter(job => job.userId===user._id)
        let myPublishedJobs= myJobs.filter(job => job.isPublished)
        let myResponses= responses.filter(response => myJobs.map(job => job._id).includes(response.jobId))
        let myUnreadResponses= myResponses.filter(response => ! response.piFeedback)
        return {
            data: user,
            annotation: {
                fullName: user.firstName + ' ' +user.name,
                nbOfJobs: myJobs.length,
                nbOfPublishedJobs: myPublishedJobs.length,
                hasJobRequests: myJobs.length > 0,
                nbUnreadResponses: myUnreadResponses.length
            }
        };
    }

    getAnnotatedUsers(): Observable<any> {
        return Observable.combineLatest(
            this.dataStore.getDataObservable('users.eurisko'), this.dataStore.getDataObservable('job.request'), this.dataStore.getDataObservable('job.response'),
            (users, jobs, responses) =>
            {
                return users.map(user => this.createAnnotatedUser(user, jobs, responses));
            });
    }

    getAnnotatedCurrentUser(): Observable<any>
    {
        return Observable.combineLatest(this.getAnnotatedUsers(), this.currentUserIdObservable, (users, userId) => {
            let usersFiltered=users.filter(user => user.data._id===userId);
            return usersFiltered.length === 0 ? null : usersFiltered[0]; 
        });
    }

    getUserId(): string {
        return this.currentUserId;
    }

    getUserIdObservable(): Observable<any> {
        return this.currentUserIdObservable;
    }

    setUserId(id: string): void{
        this.currentUserId= id;
        this.currentUserIdObservable.next(id);
    }

    isAuthenticated(): boolean {
        return true;
    }

    getCurrentUserObjectForComment() : Observable<any> 
    {
        return this.getAnnotatedCurrentUser().map(user => {
            return {
                id: user.data._id,
                fullName: user.annotation.fullName
            }
        });
    }

}