import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';
import * as CanvasJS from 'src/assets/canvasjs.min.js';

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
  population: any;
  casesPerMilion: any;
  tests: any;
  todayRecovered: any;
  todayDeaths: any;
  chartsResults: any[];
  multi: any[];
  view: any[] = [600, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Cases';

  colorScheme = {
    domain: ['#fd00003b']
  };
  results: any[];

  constructor(public covidService: CovidService) {
    this.covidService.currentMessage.subscribe(selectedCountry => {
      this.selectedCountry = selectedCountry;
      if (selectedCountry.length !== 0) {
        this.covidService.historicalDataByCountry(this.selectedCountry).subscribe((data: any) => {
          this.results = Object.keys(data.timeline.cases).map(e => ({ name: e.replace(/\//g, '.'), value: data.timeline.cases[e] }));
          this.results.splice(-1, 1);
          this.results.splice(0, this.results.length - 10);
        });
      }
    });
  }

  ngOnInit(): void {
    this.worldStatsInit();
    this.covidService.currentMessage.subscribe(selectedCountry => {
      this.selectedCountry = selectedCountry;
      if (selectedCountry.length !== 0) {
        this.loading = true;
        this.covidService.getStatsByCountry(this.selectedCountry).subscribe((country: any) => {
          this.selectedCountryName = country.country;
          this.activeWorld = country.active;
          this.todayCases = country.todayCases;
          this.todayRecovered = country.todayRecovered;
          this.casesWorld = country.cases;
          this.recoveredWorld = country.recovered;
          this.deathsWorld = country.deaths;
          this.flag = country.countryInfo.flag;
          this.population = country.population;
          this.casesPerMilion = country.casesPerOneMillion;
          this.tests = country.tests;
          this.loading = false;
          this.todayDeaths = country.todayDeaths;
        });
      }
    });
  }

  reset() {
    this.worldStatsInit();
    this.covidService.changeMessage('');
  }

  worldStatsInit() {
    this.covidService.worldStats().subscribe((stats: any) => {
      this.activeWorld = stats.active;
      this.todayCases = stats.todayCases;
      this.todayRecovered = stats.todayRecovered;
      this.todayDeaths = stats.todayDeaths;
      this.casesWorld = stats.cases;
      this.recoveredWorld = stats.recovered;
      this.deathsWorld = stats.deaths;
    });
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
