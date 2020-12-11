import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormControl } from '@angular/forms';
import { CovidService } from 'src/app/services/covid.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  myControl = new FormControl();
  @Output() toggleSidenav = new EventEmitter<void>();
  countries = [];
  filteredCountries: Observable<string[]>;
  selectedCountry;
  constructor(public covidService: CovidService) {
    this.covidService.countries().subscribe((countries: any) => {
      this.countries = countries;
    });
  }

  ngOnInit() {
    this.filteredCountries = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(100),
        map(value => this._filter(value)),
      );
  }

  public selectHandler(event): void {
    event.option.deselect();
    this.covidService.changeMessage(event.option.value);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.country.toLowerCase().includes(filterValue));
  }

  openMenu() {
    this.trigger.openMenu();
  }

}
