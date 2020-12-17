import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { CovidService } from './services/covid.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [CovidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
