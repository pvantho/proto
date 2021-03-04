import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './api-interceptor';
import { BrowserComponent } from './browser/browser.component';
import { TradingnamesComponent } from './tradingnames/tradingnames.component';
import { BusinesslistComponent } from './businesslist/businesslist.component';
import { CofresComponent } from './cofres/cofres.component';
import { PubsComponent } from './pubs/pubs.component';
import { TakeawayComponent } from './takeaway/takeaway.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BrowserComponent,
    TradingnamesComponent,
    BusinesslistComponent,
    CofresComponent,
    PubsComponent,
    TakeawayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
