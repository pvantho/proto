import { Component, OnInit } from '@angular/core';
import {EateriesService} from '../service/eateries.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CacheService} from '../service/cache.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  categories: any[];
  categoriesVisible = false;
  total = 0;
  ALL_CATEGORIES = 'ALL_CATEGORIES';
  constructor(private eateriesService: EateriesService, private cache: CacheService,
              private router: Router, private route: ActivatedRoute) {
    this.categories = [];
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    const data = this.cache.getValue(this.ALL_CATEGORIES);
    if (data)  {
      this.categories =  [...data];
      this.total = this.categories.length;
    } else {
      this.eateriesService.findAllCategories().subscribe((res) => {
        const {result} = res;
        this.categories = [...result];
        this.total = this.categories.length;
        this.cache.put(this.ALL_CATEGORIES, result);
      });
    }
  }
  goToNames(code: any): void {
    const url = '/businesscategory/' + code;
    this.router.navigate([url], {relativeTo: this.route}).then (() => {
      this.successNavigation();
    });
  }
  successNavigation(): void {
    // not implemented yet....
  }
}
