import { Component } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import moment from 'moment';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {
  appointments: any[] = [];

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.nameid || null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  loadAppointments(): void {
    const userId = this.getUserIdFromToken();

    this.schedulerService.getScheduler().subscribe({
      next: (data: any[]) => {
        const filteredData = data.filter(item => item.applicationUserId === userId);

        this.appointments = filteredData.map(item => ({
          ...item,
          startDate: moment.utc(item.dateFrom).local().toDate(),
          endDate: moment.utc(item.dateTo).local().toDate(),
          therapistNameList: item.therapistNames?.split(',').map((name: string) => name.trim()) || []
        }));
      },
      error: err => {
        console.error('Error loading appointments:', err);
      }
    });
  }
}
