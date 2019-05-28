import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';

import { AppComponent } from './app.component';
import { FirstCaseComponent } from './first-case/first-case.component';
import { SecondCaseComponent } from './second-case/second-case.component';
import { HomeComponent } from './home/home.component';
import { FirstChartComponent } from './first-chart/first-chart.component';
import { SecondChartComponent } from './second-chart/second-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstCaseComponent,
    SecondCaseComponent,
    HomeComponent,
    FirstChartComponent,
    jqxChartComponent,
    SecondChartComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'prviSlucaj', component: FirstCaseComponent },
      { path: 'drugiSlucaj', component: SecondCaseComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
