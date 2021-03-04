import { Component, OnInit } from '@angular/core';
import {EateriesService} from '../service/eateries.service';
import {CacheService} from '../service/cache.service';

@Component({
  selector: 'app-takeaway',
  templateUrl: './takeaway.component.html',
  styleUrls: ['./takeaway.component.css']
})
export class TakeawayComponent implements OnInit {
  takeaway: any[];
  total = 0;
  category = 'Takeaway';
  TAKEAWAY = 'TAKEAWAY';
  constructor(private eateriesService: EateriesService, private cache: CacheService) {
    this.takeaway = [];
  }
  ngOnInit(): void {
    this.getAllTakeaway();
  }
  getAllTakeaway(): void {
    const data = this.cache.getValue(this.TAKEAWAY);
    if (data)  {
      this.takeaway =  [...data];
      this.total = this.takeaway.length;
    } else {
      this.eateriesService.findAllTakeaway().subscribe((res) => {
        const {status, result, total} = res;
        this.takeaway = status === 'success' ? [...result] : [];
        this.total = total;
        this.cache.put(this.TAKEAWAY, result);
      });
    }
  }
}
