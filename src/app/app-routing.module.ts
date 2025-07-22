import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TherapistComponent } from './therapist/therapist.component';
import { DashboardpatientComponent } from './dashboardpatient/dashboardpatient.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path:'therapist', component: TherapistComponent},
  {path:'dashboardpatient',component:DashboardpatientComponent},
  {path:'scheduler',component:SchedulerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
