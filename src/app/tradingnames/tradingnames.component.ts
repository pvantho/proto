import { Component, OnInit } from '@angular/core';
import {EateriesService} from '../service/eateries.service';
import {CacheService} from '../service/cache.service';

@Component({
  selector: 'app-tradingnames',
  templateUrl: './tradingnames.component.html',
  styleUrls: ['./tradingnames.component.css']
})
export class TradingnamesComponent implements OnInit {
  names: any[];
  categoriesVisible = false;
  total = 0;
  ALL_NAMES = 'ALL_NAMES';
  constructor(private eateriesService: EateriesService, private cache: CacheService) {
    this.names = [];
  }
  ngOnInit(): void {
    this.getAllNames();
  }
  getAllNames(): void {
    const data = this.cache.getValue(this.ALL_NAMES);
    if (data)  {
      this.names =  [...data];
      this.total = this.names.length;
    } else {
      this.eateriesService.findAllNames().subscribe((res) => {
        const {result} = res;
        this.names = [...result];
        this.total = this.names.length;
        this.cache.put(this.ALL_NAMES, result);
      });
    }
  }
}
