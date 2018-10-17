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

    constructor(private httpClient: HttpClient) {
        super();
    }

    // BEGIN: CRUD -> READ -> GET LIST (returns list of items)

    public getMeasures() {
        let apiUrl = this.baseApiUrl + "/measures";
        return this.httpClient.get<any>(apiUrl);
    }

    public getIngredients() {
        let apiUrl = this.baseApiUrl + "/ingredients";
        return this.httpClient.get<any>(apiUrl);
    }

    // END: CRUD -> READ -> GET LIST (returns list of items)


    // BEGIN: CRUD -> READ -> CHECK (returns true/false)

    public checkIngredientUniqueness(ingredientName: string) {
        let apiUrl = this.baseApiUrl + "/ingredient-unique/" + ingredientName;
        return this.httpClient.get(apiUrl);
    }

    // END: CRUD -> READ -> CHECK (returns true/false)


    // BEGIN: CRUD -> CREATE (save in db)

    public saveIngredient(ingredientForm: any) {
        let apiUrl = this.baseApiUrl + "/ingredient";
        return this.httpClient.post(apiUrl, ingredientForm);
    }

    public saveError(httpErrorResponse: HttpErrorResponse) {
        let apiUrl = this.baseApiUrl + "/homecuisine/error";
        let body = {"description": httpErrorResponse.message};
        return this.httpClient.post(apiUrl, body);
    }

    // END: CRUD -> CREATE (save in db)
}