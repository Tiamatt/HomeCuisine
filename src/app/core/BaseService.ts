import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class BaseService{
    baseApiUrl: string = "https://localhost:5001/api";
    header: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    // try to keep constructor empty
    constructor() {}
}