import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  worldStats;
  activeWorld: any;
  casesWorld: any;
  recoveredWorld: any;
  deathsWorld: any;
  selectedCountry;
  loading: boolean;
  flag: any;
  selectedCountryName: any;
  todayCases: any;
  constructor(public covidService: CovidService) { }

  ngOnInit(): void {
    this.covidService.worldStats().subscribe((stats: any) => {
      this.activeWorld = stats.active;
      this.todayCases = stats.todayCases;
      this.casesWorld = stats.cases;
      this.recoveredWorld = stats.recovered;
      this.deathsWorld = stats.deaths;
    });
    this.covidService.currentMessage.subscribe(selectedCountry => {
      this.selectedCountry = selectedCountry;
      if (selectedCountry.length !== 0) {
        this.loading = true;
        this.covidService.getStatsByCountry(this.selectedCountry).subscribe((country: any) => {
          this.selectedCountryName = country.country;
          this.activeWorld = country.active;
          this.todayCases = country.todayCases;
          this.casesWorld = country.cases;
          this.recoveredWorld = country.recovered;
          this.deathsWorld = country.deaths;
          this.flag = country.countryInfo.flag;
          this.loading = false;
        });
      }
    });
  }

}
