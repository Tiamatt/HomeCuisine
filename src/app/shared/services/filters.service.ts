import { CoreService } from './../../core/CoreService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class FiltersService extends CoreService{

    constructor(private httpClient: HttpClient) {
        super();
    }

    public getMeasures() {
        let apiUrl = this.baseApiUrl + "/filters/measures";
        return this.httpClient.get<any>(apiUrl);
    }
}