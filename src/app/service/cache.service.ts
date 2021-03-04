import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  cache: any;
  constructor() {
    this.cache = {};
  }
  put(k: string, value: any): void{
    this.cache[k] = value;
  }
  getValue(k: string): any {
    return this.cache[k];
  }
}
