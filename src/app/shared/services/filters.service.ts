import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class FiltersService{
    private baseApiUrl: string = "https://localhost:5001/api";
    private header: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    constructor(private httpClient: HttpClient) {}

    public getMeasures() {
        let apiUrl = this.baseApiUrl + "/filters/measures";
        return this.httpClient.get<any>(apiUrl);
    }
}