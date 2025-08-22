import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bank Map Application';
}



//import { Component } from '@angular/core';
////import { RouterOutlet } from '@angular/router';

//@Component({
//  selector: 'app-root',
//  standalone: false,
//  //imports: [RouterOutlet],
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
//})
//export class AppComponent {
//  title = 'Bank Map Application';
//}



//import { HttpClient } from '@angular/common/http';
//import { Component, OnInit } from '@angular/core';

////interface WeatherForecast {
////  date: string;
////  temperatureC: number;
////  temperatureF: number;
////  summary: string;
////}

//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  standalone: false,
//  styleUrl: './app.component.css'
//})
//export class AppComponent implements OnInit {
//  public forecasts: WeatherForecast[] = [];

//  constructor(private http: HttpClient) {}

//  ngOnInit() {
//    this.getForecasts();
//  }

//  getForecasts() {
//    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
//      (result) => {
//        this.forecasts = result;
//      },
//      (error) => {
//        console.error(error);
//      }
//    );
//  }

//  title = 'bankmapapp.client';
//}
