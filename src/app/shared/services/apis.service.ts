import { FilterModel } from './../models/filter.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BaseService } from '../../core/BaseService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class ApisService extends BaseService{

    baseApiUrl: string = "https://localhost:5001/api/homecuisine"; // 'http://tiamatt.com/api/homecuisine/'; // "https://localhost:5001/api";
    header: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    constructor(
        private httpClient: HttpClient,
        private toastrManager: ToastrManager,) {
        
        super();
    }

    // BEGIN: CRUD -> READ -> GET LIST (returns list of items)
    
    public getFilter(entityName:string): Promise<FilterModel[]> | null{
        // development error
        if (this.isNullOrWhiteSpace(entityName)) {
            this.toastrManager.errorToastr("EntityName can't be empty. Called from ApisService -> getFilter()", "Dev error!");
            return null;
        }

        let apiUrl = this.baseApiUrl + "/filter/" + entityName;
        return this.httpClient.get<FilterModel[]>(apiUrl).toPromise();
    }

    // END: CRUD -> READ -> GET LIST (returns list of items)


    // BEGIN: CRUD -> READ -> CHECK (returns true/false)

    public checkUniqueness(entityName:string, value: string): Promise<boolean> | null {
        // development error
        if (this.isNullOrWhiteSpace(entityName) || this.isNullOrWhiteSpace(value)) {
            let errorMessage = (this.isNullOrWhiteSpace(entityName)) 
            ? "EntityName can't be empty. Called from ApisService -> checkUniqueness()"
            : "Value for checking uniqueness can't be empty. Called from ApisService -> checkUniqueness())";
            this.toastrManager.errorToastr(errorMessage, "Dev error!");
            return new Promise(null);
        }

        let apiUrl = this.baseApiUrl + "/" + entityName + "-unique/" + value;
        return this.httpClient.get<boolean>(apiUrl).toPromise();
    }

    // END: CRUD -> READ -> CHECK (returns true/false)


    // BEGIN: CRUD -> CREATE (save in db)

    public saveIngredient(ingredientForm: any) {
        let apiUrl = this.baseApiUrl + "/ingredient";
        return this.httpClient.post(apiUrl, ingredientForm);
    }

    public saveError(httpErrorResponse: HttpErrorResponse) {
        let apiUrl = this.baseApiUrl + "/error";
        let body = {"description": httpErrorResponse.message};
        return this.httpClient.post(apiUrl, body);
    }

    // END: CRUD -> CREATE (save in db)
}