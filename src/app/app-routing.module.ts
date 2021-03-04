import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrowserComponent} from './browser/browser.component';
import {TradingnamesComponent} from './tradingnames/tradingnames.component';
import {BusinesslistComponent} from './businesslist/businesslist.component';
import {PubsComponent} from './pubs/pubs.component';
import {CofresComponent} from './cofres/cofres.component';
import {TakeawayComponent} from './takeaway/takeaway.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'categories', component: BrowserComponent},
  { path: 'tradingnames', component: TradingnamesComponent},
  { path: 'businesscategory/:id', component: BusinesslistComponent },
  { path: 'cafesrestaurants', component: CofresComponent },
  { path: 'pubs', component: PubsComponent },
  { path: 'takeaway', component: TakeawayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  useHash : true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
