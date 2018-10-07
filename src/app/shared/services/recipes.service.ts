import { BaseService } from '../../core/BaseService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class RecipesService extends BaseService{

    constructor(private httpClient: HttpClient) {
        super();
    }

    public saveIngredient(ingredientName: string) {
        let apiUrl = this.baseApiUrl + "/recipes/ingredient";
        let body = {"name": ingredientName};
        return this.httpClient.post(apiUrl, body);
    }
}