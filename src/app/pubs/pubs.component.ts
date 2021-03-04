import { Component, OnInit } from '@angular/core';
import {EateriesService} from '../service/eateries.service';
import {CacheService} from '../service/cache.service';

@Component({
  selector: 'app-pubs',
  templateUrl: './pubs.component.html',
  styleUrls: ['./pubs.component.css']
})
export class PubsComponent implements OnInit {
  pubs: any[];
  total = 0;
  category = 'Pubs, Taverns and Bars ';
  PUBS = 'PUBS';
  constructor(private eateriesService: EateriesService, private cache: CacheService) {
    this.pubs = [];
  }
  ngOnInit(): void {
    this.getAllCafesRestaurants();
  }
  getAllCafesRestaurants(): void {
    const data = this.cache.getValue(this.PUBS);
    if (data)  {
      this.pubs =  [...data];
      this.total = this.pubs.length;
    } else {
      this.eateriesService.findPubs().subscribe((res) => {
        const {status, result, total} = res;
        this.pubs = status === 'success' ? [...result] : [];
        this.total = total;
        this.cache.put(this.PUBS, result);
      });
    }
  }
}
