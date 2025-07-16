import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxMapModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxValidatorModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TherapistComponent } from './therapist/therapist.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardpatientComponent } from './dashboardpatient/dashboardpatient.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DxSchedulerComponent, DxSchedulerModule } from "devextreme-angular/ui/scheduler";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PatientComponent,
    DashboardComponent,
    TherapistComponent,
    DashboardpatientComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxToolbarModule,
    RouterModule,
    DxDataGridModule,
    DxTextAreaModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    HttpClientModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxChartModule,
    DxPieChartModule,
    DxMapModule,
    CommonModule,
    FormsModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    FormsModule,
    ReactiveFormsModule,
    DxSchedulerComponent,
    DxSchedulerModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
