import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable() //need to inject build-in HttpClient service

export class GeneralService{
    private baseApiUrl: string = "https://localhost:5001/api";
    private header: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    constructor(
        private httpClient: HttpClient
        ) {}

    public saveError(httpErrorResponse: HttpErrorResponse) {
        let apiUrl = this.baseApiUrl + "/general/error";
        let body = {"description": httpErrorResponse.message};
        return this.httpClient.post(apiUrl, body);

    }
}