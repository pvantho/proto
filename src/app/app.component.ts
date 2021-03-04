import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'M.A.A.A';
  constructor(private router: Router, private route: ActivatedRoute) {
  }
  goToCategories(): void {
    this.router.navigate(['/categories'], { relativeTo: this.route}).then( () => {
      this.successNavigation();
    });
  }
  goToTradingNames(): void {
    this.router.navigate(['/tradingnames'], { relativeTo: this.route}).then( () => {
      this.successNavigation();
    });
  }
  goToSearch(): void {
    this.router.navigate(['/dashboard'], { relativeTo: this.route}).then( () => {
      this.successNavigation();
    });
  }
  goToPubs(): void {
    this.router.navigate(['/pubs'], { relativeTo: this.route}).then( () => {
      this.successNavigation();
    });
  }
  goToCafesRestaurants(): void {
    this.router.navigate(['/cafesrestaurants'], { relativeTo: this.route}).then( () => {
      this.successNavigation();
    });
  }
  goToTakeaway(): void {
    this.router.navigate(['/takeaway'], { relativeTo: this.route}).then( () => {
      this.successNavigation();
    });
  }
  successNavigation(): void {
    // not implemented yet....
  }
}
