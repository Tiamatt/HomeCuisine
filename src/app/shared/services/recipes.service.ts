import { BaseService } from '../../core/BaseService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class RecipesService extends BaseService{

    constructor(private httpClient: HttpClient) {
        super();
    }

    public saveIngredient(ingredientForm: any) {
        let apiUrl = this.baseApiUrl + "/ingredient";
        return this.httpClient.post(apiUrl, ingredientForm);
    }

    public checkIngredientUniqueness(ingredientName: string) {
        let apiUrl = this.baseApiUrl + "/ingredient-unique/" + ingredientName;
        return this.httpClient.get(apiUrl);
    }
}