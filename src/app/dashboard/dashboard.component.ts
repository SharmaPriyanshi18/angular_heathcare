import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
chartData = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 7000 },
  { month: 'Mar', revenue: 6500 },
  { month: 'Apr', revenue: 8000 },
  { month: 'May', revenue: 7200 },
];

pieData = [
  { category: 'Therapy', value: 40 },
  { category: 'Surgery', value: 25 },
  { category: 'Consultation', value: 20 },
  { category: 'Others', value: 15 },
];

lineData = [
  { day: 'Mon', appointments: 20 },
  { day: 'Tue', appointments: 30 },
  { day: 'Wed', appointments: 25 },
  { day: 'Thu', appointments: 40 },
  { day: 'Fri', appointments: 35 },
];

tableData = [
  { name: 'John Doe', age: 28, gender: 'Male', contact: '9876567887' },
  { name: 'Mehra', age: 24, gender: 'Female', contact: '7894561000' },
  { name: 'Amit Sharma', age: 35, gender: 'Male', contact: '8899001122' },
];
}
