import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TherapistComponent } from './therapist/therapist.component';
import { DashboardpatientComponent } from './dashboardpatient/dashboardpatient.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

import { DxButtonModule, DxChartModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxMapModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule, DxTabPanelModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxValidatorModule } from 'devextreme-angular';
import { DxSchedulerModule } from 'devextreme-angular/ui/scheduler';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxListComponent } from "devextreme-angular/ui/list";
import { AppointmentComponent } from './appointment/appointment.component';
import { NotedetailComponent } from './notedetail/notedetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PatientComponent,            
    DashboardComponent,
    TherapistComponent,
    DashboardpatientComponent,
    SchedulerComponent,
    AppointmentComponent,
    NotedetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DxToolbarModule,
    DxDataGridModule,
    DxTextAreaModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxChartModule,
    DxPieChartModule,
    DxMapModule,
    DxSelectBoxModule,
    DxSchedulerModule,
    DxListComponent,
    DxTabPanelModule
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
