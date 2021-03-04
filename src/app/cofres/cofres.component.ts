import { Component, OnInit } from '@angular/core';
import {EateriesService} from '../service/eateries.service';
import {CacheService} from '../service/cache.service';

@Component({
  selector: 'app-cofres',
  templateUrl: './cofres.component.html',
  styleUrls: ['./cofres.component.css']
})
export class CofresComponent implements OnInit {
  cafesRestaurants: any[];
  total = 0;
  category = 'Cafes and Restaurants';
  CAFES_RESTAURANTS = 'CAFES_RESTAURANTS';
  constructor(private eateriesService: EateriesService, private cache: CacheService) {
    this.cafesRestaurants = [];
  }
  ngOnInit(): void {
    this.getAllCafesRestaurants();
  }
  getAllCafesRestaurants(): void {
    const data = this.cache.getValue(this.CAFES_RESTAURANTS);
    if (data)  {
      this.cafesRestaurants =  [...data];
      this.total = this.cafesRestaurants.length;
    } else {
      this.eateriesService.findCafesRestaurants().subscribe((res) => {
        const {status, result, total} = res;
        this.cafesRestaurants = status === 'success' ? [...result] : [];
        this.total = total;
        this.cache.put(this.CAFES_RESTAURANTS, result);
      });
    }
  }
}
