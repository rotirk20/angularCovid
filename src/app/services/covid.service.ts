import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  // tslint:disable-next-line:variable-name
  private base_url = 'https://disease.sh/';
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  constructor(public http: HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  worldStats() {
    return this.http.get(this.base_url + 'v3/covid-19/all');
  }

  countries() {
    return this.http.get(this.base_url + 'v3/covid-19/countries');
  }

  getStatsByCountry(country) {
    return this.http.get(this.base_url + 'v3/covid-19/countries/' + country);
  }

  historicalDataByCountry(country) {
    return this.http.get(this.base_url + 'v3/covid-19/historical/' + country);
  }

}
