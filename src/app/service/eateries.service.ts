import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EateriesService {
  baseUrl = environment.baseUrl;
  cafesCode = 4511;
  pubsCode = 4520;
  takeaway = 4512;
  constructor(private httpClient: HttpClient) { }
  findEateries(params: string): Observable<any> {
    const url = this.baseUrl + '/eateries?q=' + params;
    return this.httpClient.get(url);
  }
  findAllCategories(): Observable<any> {
    const url = this.baseUrl + '/eateries/categories';
    return this.httpClient.get(url);
  }
  findAllNames(): Observable<any> {
    const url = this.baseUrl + '/eateries/names';
    return this.httpClient.get(url);
  }
  findBusinessByCategoryCode(code: any): Observable<any> {
    const url = this.baseUrl + '/eateries/names/categories/' + code;
    return this.httpClient.get(url);
  }
  findCafesRestaurants(): Observable<any> {
    const url = this.baseUrl + '/eateries/names/categories/' + this.cafesCode;
    return this.httpClient.get(url);
  }
  findPubs(): Observable<any> {
    const url = this.baseUrl + '/eateries/names/categories/' + this.pubsCode;
    return this.httpClient.get(url);
  }
  findAllTakeaway(): Observable<any> {
    const url = this.baseUrl + '/eateries/names/categories/' + this.takeaway;
    return this.httpClient.get(url);
  }
}
