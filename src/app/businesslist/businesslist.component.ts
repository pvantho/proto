import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EateriesService} from '../service/eateries.service';

@Component({
  selector: 'app-businesslist',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./businesslist.component.css']
})
export class BusinesslistComponent implements OnInit {
  businessList: any[];
  category: any;
  total: number;
  constructor(private eateriesService: EateriesService, private router: Router, private route: ActivatedRoute) {
    this.businessList = [];
    this.total = 0;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getAllBusinessByCategoryCode(id);
  }
  getAllBusinessByCategoryCode(code: any): void {
    this.eateriesService.findBusinessByCategoryCode(code).subscribe((res) => {
      const { status, result, total } = res;
      if (status === 'success') {
        const [ first ] = result;
        this.category = first.Industry_description;
        this.businessList = [...result];
        this.total = total;
      } else {
        this.businessList = [];
      }
    });
  }
}
