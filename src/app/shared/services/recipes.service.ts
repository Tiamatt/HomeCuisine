import { BaseService } from '../../core/BaseService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class RecipesService extends BaseService{

    constructor(private httpClient: HttpClient) {
        super();
    }

    public saveIngredient(ingredientForm: any) {
        let apiUrl = this.baseApiUrl + "/homecuisine/ingredient";
        return this.httpClient.post(apiUrl, ingredientForm);
    }
}