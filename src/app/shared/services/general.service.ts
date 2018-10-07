import { CoreService } from './../../core/CoreService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable() //need to inject build-in HttpClient service

export class GeneralService extends CoreService{
    constructor(
        private httpClient: HttpClient
        ) {
            super();
        }

    public saveError(httpErrorResponse: HttpErrorResponse) {
        let apiUrl = this.baseApiUrl + "/general/error";
        let body = {"description": httpErrorResponse.message};
        return this.httpClient.post(apiUrl, body);
    }
}