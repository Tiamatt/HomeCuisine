import { FilterModel } from './../models/filter.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BaseService } from '../../core/BaseService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';
import { RecipeShortModel } from '../models/recipe-short';
import { Observable } from 'rxjs';

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

    // BEGIN: CRUD -> READ -> GET LIST OR SINGLE ITEM
    
    public getFilter(entityName:string): Promise<FilterModel[]> | null{
        // development error
        if (this.isNullOrWhiteSpace(entityName)) {
            this.toastrManager.errorToastr("EntityName can't be empty. Called from ApisService -> getFilter()", "Dev error!");
            return null;
        }

        let apiUrl = this.baseApiUrl + "/filters/" + entityName;
        return this.httpClient.get<FilterModel[]>(apiUrl).toPromise();
    }

    public getRecipe(recipeId: number): Observable<RecipeModel> | null {
        if (recipeId < 1) {
            this.toastrManager.errorToastr("RecipeId can't be less than zero. Called from ApisService -> GetRecipe()", "Dev error!");
            return null;
        }

        let apiUrl = this.baseApiUrl + "/recipe/" + recipeId;
        return this.httpClient.get<RecipeModel>(apiUrl);
    }

    public getCategory(categoryId: number): Promise<any> | null {
        if (categoryId < 1) {
            this.toastrManager.errorToastr("CategoryId can't be less than zero. Called from ApisService -> getCategory()", "Dev error!");
            return null;
        }

        let apiUrl = this.baseApiUrl + "/category/" + categoryId;
        return this.httpClient.get<any>(apiUrl).toPromise();
    }

    public getRecipesByCategory(categoryId: number): Promise<RecipeShortModel[]> | null{
        if (categoryId < 1) {
            this.toastrManager.errorToastr("CategoryId can't be less than zero. Called from ApisService -> getRecipesByCategory()", "Dev error!");
            return null;
        }

        let apiUrl = this.baseApiUrl + "/recipes/" + categoryId;
        return this.httpClient.get<RecipeShortModel[]>(apiUrl).toPromise();
    }

    // END: CRUD -> READ -> GET LIST OR SINGLE ITEM


    // BEGIN: CRUD -> READ -> CHECK (returns true/false)

    public checkUniqueness(entityName:string, value: string, excludedEntityId: number): Promise<boolean> | null {
        // development error
        if (this.isNullOrWhiteSpace(entityName) || this.isNullOrWhiteSpace(value)) {
            let errorMessage = (this.isNullOrWhiteSpace(entityName)) 
            ? "EntityName can't be empty. Called from ApisService -> checkUniqueness()"
            : "Value for checking uniqueness can't be empty. Called from ApisService -> checkUniqueness())";
            this.toastrManager.errorToastr(errorMessage, "Dev error!");
            return new Promise(null);
        }
        // kali - validate excludedEntityId

        let apiUrl = this.baseApiUrl + "/" + entityName + "-unique/" + value + "/" + excludedEntityId;
        return this.httpClient.get<boolean>(apiUrl).toPromise();
    }

    // END: CRUD -> READ -> CHECK (returns true/false)


    // BEGIN: CRUD -> CREATE (save in db)

    public saveIngredient(ingredientForm: any) {
        let apiUrl = this.baseApiUrl + "/ingredient";
        return this.httpClient.post(apiUrl, ingredientForm);
    }

    public saveCategory(categoryForm: any) {
        let apiUrl = this.baseApiUrl + "/category";
        return this.httpClient.post(apiUrl, categoryForm);
    }

    public createRecipe(recipeModel: RecipeModel) {
        let apiUrl = this.baseApiUrl + "/recipe";
        return this.httpClient.post(apiUrl, recipeModel);
    }

    public saveError(httpErrorResponse: HttpErrorResponse) {
        let apiUrl = this.baseApiUrl + "/error";
        let body = {"description": httpErrorResponse.message};
        return this.httpClient.post(apiUrl, body);
    }

    // END: CRUD -> CREATE (save in db)

    // BEGIN: CRUD -> UPDATE (update in db)

    public updateRecipe(recipeId: number, recipeModel: RecipeModel) {
        let apiUrl = this.baseApiUrl + "/recipe/" + recipeId;
        return this.httpClient.put(apiUrl, recipeModel);
    }

    // END: CRUD -> UPDATE (update in db)
}