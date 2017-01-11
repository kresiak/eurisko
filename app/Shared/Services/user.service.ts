import { Injectable, Inject } from '@angular/core'
import { DataStore } from './data.service'
import {AuthService} from './auth.service'
import { Observable } from 'rxjs/Rx'


@Injectable()
export class UserService {
    readonly symJob= 'job'
    readonly symApplication= 'application'
    readonly symTableDashlets= 'dashlets.eurisko'

    constructor( @Inject(DataStore) private dataStore: DataStore, @Inject(AuthService) private authService: AuthService) { }

    //   CRUD Changes
    //   =============

    private createDashletForCurrentUser(category: string, id: string)
    {
        let userId= this.authService.getUserId();

        this.dataStore.getDataObservable(this.symTableDashlets).first().subscribe(dashlets =>
        {
            if (dashlets.filter(dashlet => dashlet.user === userId && dashlet.category === category && dashlet.id === id).length === 0)
            {
                this.dataStore.addData(this.symTableDashlets, { userId: userId, category: category, id: id });
            }
        });        
    }    

    removeDashletForCurrentUser(dbid)
    {
        this.dataStore.getDataObservable(this.symTableDashlets).map(dashlets => dashlets.filter(dashlet => dashlet._id === dbid)).subscribe(dashlets =>
        {
            if (dashlets.length > 0)
            {
                let userId= this.authService.getUserId();
                let dashlet= dashlets[0];
                if (dashlet.userId===userId)
                {
                    this.dataStore.deleteData(this.symTableDashlets, dbid);
                }
            }
        });                
    }

    getDashletsForCurrentUser() : Observable<any>
    {
        return Observable.combineLatest(this.dataStore.getDataObservable(this.symTableDashlets), this.authService.getUserIdObservable(), (dashlets, userId) => {
            return dashlets.filter(dashlet => dashlet.userId === userId);
        });
    }

    // Job specific
    // ============

    getJobDashletsForCurrentUser() : Observable<any>
    {
        return this.getDashletsForCurrentUser().map(dashlets => dashlets.filter(dashlet => dashlet.category===this.symJob))
    }

    createJobDashletForCurrentUser(jobId: string)
    {
        return this.createDashletForCurrentUser(this.symJob, jobId);
    }

    isJobDashlet(category: string) : boolean
    {
        return category === this.symJob;
    }

    // Application specific
    // ===============

    getApplicationDashletsForCurrentUser() : Observable<any>
    {
        return this.getDashletsForCurrentUser().map(dashlets => dashlets.filter(dashlet => dashlet.category===this.symApplication))
    }

    createApplicationDashletForCurrentUser(applicationId: string)
    {
        return this.createDashletForCurrentUser(this.symApplication, applicationId);
    }

    isApplicationDashlet(category: string) : boolean
    {
        return category === this.symApplication;
    }
 
}