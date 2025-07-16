import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboardpatient',
  standalone: false,
  templateUrl: './dashboardpatient.component.html',
  styleUrl: './dashboardpatient.component.scss'
})
export class DashboardpatientComponent {

  patientStats = [
    { month: 'Jan', opd: 100, admitted: 120 },
    { month: 'Feb', opd: 110, admitted: 130 },
    { month: 'Mar', opd: 115, admitted: 145 },

  ];

  recoveryStats = [
    { month: 'Jan', heart: 30, fracture: 18, cold: 12 },
    { month: 'Feb', heart: 40, fracture: 25, cold: 15 },

  ];

  admittedPatients = [
    { id: 1, name: 'John Doe', age: 32, country: 'USA', gender: 'Male' },
    { id: 2, name: 'Jane Smith', age: 28, country: 'India', gender: 'Female' },

  ];
}


