import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() //need to inject build-in HttpClient service

export class BaseService{
    // try to keep constructor empty
    constructor() {}
}