import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EateriesService} from '../service/eateries.service';
import {GeolocationService} from '../service/geolocation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   title: any;
  seatingType = ['indoor', 'outdoor', 'any'];
  queryForm: FormGroup;
  submitted = false;
  total = 0;
  info = false;
  show = false;
  result: any[];
  outdoor = false;
  outdoorNumber = 0;
  indoorNumber = 0;
  run = false;
  resultView: any;
  indoorPercent = '%';
  outdoorPercent = '%';
  pie: any;
  location: any;

  constructor(private formBuilder: FormBuilder, private eateriesService: EateriesService, private geolocationService: GeolocationService) {
    this.location = null;
    this.result = [];
    this.resultView = {
      option: 'details'
    };
    this.queryForm = this.formBuilder.group({
      seating_type: [''],
      point: [''],
      radius: [''],
      number_seats: [''],
      trading_name: ['']
    });
  }

  changeSeating($event: Event): void {}
  ngOnInit(): void {
    this.title = 'CBD EATERIES';
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.location = { latitude, longitude };
        // this.geolocationService.getAddress(latitude, longitude).subscribe( (data:any) => {
           // console.log('>> data', data);
        // });
      });
    }
  }


  // tslint:disable-next-line:typedef
  get f() { return this.queryForm?.controls; }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.queryForm?.invalid) {
      return;
    }
    console.log('>> ', this.queryForm.controls);
    this.search();
  }
  setView(option: string): void {
    this.resultView.option = option;
  }
  search(): void {
   // console.log('>> ', this.queryForm.controls);
    this.run = true;
    const controls: any = this.queryForm.controls;
    this.indoorNumber = 0;
    this.outdoorNumber = 0;
    this.result = [];
    const  attributes = Object.keys(controls);
    const values: any[] = [];
    const points: any[] = [];
    attributes.map ( (x) => {
      const v = this.queryForm.controls[x].value;
      if (!v || v === 'any') { return; }
      if (x === 'point') {
        if (v.split(',').length === 2) {
          points.push(v);
        }
      }
      else if (x === 'radius') {
        points.push(v);
      }
      else if (x === 'number_seats') {
        values.push( `{"${x}":${v}}`);
      }
      else if (v) {
        if (v === 'outdoor') {
          this.outdoor = true;
        }
        values.push( `{"${x}":"${v}"}`);
      }
    });
    const pts = points.join(',');
    const radius = points.length === 2 ? '{"radius": [' + pts + ']}' : '';
    if (radius !== '') {
      values.push(radius);
    }
    const query = '{"$and":['  + values.join(',') + ']}';
    console.log('>> ', query);
    this.pie = null;
    this.info = !this.info;
    this.show = false;
    this.eateriesService.findEateries(query).subscribe((res: any) => {
        this.run = false;
        const { status, total, result} = res;
        this.total = total;

        console.log(result);
        this.result = [...result];
        let indoors = 0;
        let outdoors = 0;
        result.map( (x: any) =>   {
          if (x.Seating_type === 'Seats - Outdoor') {
          outdoors++;
          } else if (x.Seating_type === 'Seats - Indoor') {
            indoors++;
          }
        });
        this.outdoorNumber = outdoors;
        this.indoorNumber = indoors;
        this.indoorPercent =  Math.round( (indoors / result.length) * 100 ) + '%';
        this.outdoorPercent =  Math.round( (outdoors / result.length) * 100 ) + '%';
        this.pie = {
          'background-image': 'conic-gradient(black ' + this.indoorPercent  + ', grey ' + this.outdoorPercent + ', white)'
        };
        this.show = true;
        console.log('>> i =', this.indoorPercent, this.outdoorPercent);
    });

  }
}
