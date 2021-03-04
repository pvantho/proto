import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private httpClient: HttpClient) {}
  getAddress(lat: number, lng: number): any {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyA0j8C_kmD4ZKrjonG78tj4D2jqHPgTnWc';
    return this.httpClient.get(url);
  }
}
