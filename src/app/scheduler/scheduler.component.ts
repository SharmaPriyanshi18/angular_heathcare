import { Patient } from './../patient';
import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import * as moment from 'moment';

export class Scheduler {
  schedulerId?: number;
  dateFrom!: Date;
  dateTo!: Date;
  title!: string;
  applicationUserId!: string;
  therapistId!: number;
  userName?: string;
  therapistName?: string;
  startDate?: Date;
  endDate?: Date;
  text?: string;
  caseId?: number;
}

@Component({
  selector: 'app-scheduler',
  standalone: false,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  currentDate = new Date();
  appointments: Scheduler[] = [];
  therapists: any[] = [];
  Patients: any[] = [];
  Cases: any[] = [];

  constructor(private schedulerService: SchedulerService) { }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadTherapists();
    this.loadPatients();
    this.loadCases();
  }

  loadAppointments(): void {
    this.schedulerService.getScheduler().subscribe({
      next: (data: Scheduler[]) => {
        this.appointments = data.map((item) => ({
          ...item,
          startDate: moment.utc(item.dateFrom).local().toDate(),
          endDate: moment.utc(item.dateTo).local().toDate(),
          text: item.title,
        }));
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
      }
    });
  }

  loadTherapists(): void {
    this.schedulerService.getTherapists().subscribe({
      next: (data) => {
        this.therapists = data;
      },
      error: (err) => {
        console.error('Error loading therapists:', err);
      }
    });
  }
    deleteScheduler(id: number): void {
    console.log('Attempting to delete therapist with ID:', id);
    this.schedulerService.deleteScheduler(id).subscribe({
      next: () => {
        console.log('Schedule deleted');
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Failed to delete Schedule:', err);
      }
    });
  }
    updatescheduler(Scheduler: Scheduler): void {
      this.schedulerService.updateScheduler(Scheduler).subscribe({
        next: () => {
          console.log('Schedule updated');
          this.loadTherapists();
        },
        error: (err) => {
          console.error('Failed to update Schedule:', err);
        }
      });
    }
  


  loadPatients(): void {
    this.schedulerService.getPatients().subscribe({
      next: (data) => {
        console.log('Patients:', data);
        this.Patients = data;
      },
      error: (err) => {
        console.error('Error loading patients:', err);
      }
    });
  }

  loadCases(): void {
    this.schedulerService.getCases().subscribe({
      next: (data) => {
        console.log('Cases:', data);
        this.Cases = data;
      },
      error: (err) => {
        console.error('Error loading cases:', err);
      }
    });
  }

  onAppointmentFormOpening(e: any): void {
    const form = e.form;
    form.option('formData', e.appointmentData);

    setTimeout(() => {
      form.option('items', [
        {
          itemType: 'group',
          rowCount: 5,
          items: [
            {
              dataField: 'applicationUserId',
              label: { text: 'Patient Name' },
              editorType: 'dxSelectBox',
              editorOptions: {
                items: this.Patients,
                valueExpr: 'id',
                displayExpr: 'userName', 
                searchEnabled: true
              }
            },
            {
              dataField: 'therapistId',
              label: { text: 'Therapist' },
              editorType: 'dxSelectBox',
              editorOptions: {
                items: this.therapists,
                valueExpr: 'therapistId',
                displayExpr: 'name',
                searchEnabled: true
              }
            },
            {
              dataField: 'caseId',
              label: { text: 'Case Title' },
              editorType: 'dxSelectBox',
              editorOptions: {
                items: this.Cases,
                valueExpr: 'caseId',
                displayExpr: 'title',
                searchEnabled: true
              }
            },
            {
              dataField: 'startDate',
              label: { text: 'From' },
              editorType: 'dxDateBox',
              editorOptions: {
                type: 'datetime',
                displayFormat: 'HH:mm',
                useMaskBehavior: true,
              },
            },
            {
              dataField: 'endDate',
              label: { text: 'To' },
              editorType: 'dxDateBox',
              editorOptions: {
                type: 'datetime',
                displayFormat: 'HH:mm',
                useMaskBehavior: true,
              },
            },
          ],
        },
      ]);
    }, 0);
  }

  onAppointmentAdding(e: any): void {
    const appt = e.appointmentData;
    e.cancel = true;

    const newScheduler: Scheduler = {
      schedulerId: 0,
      dateFrom: appt.startDate,
      dateTo: appt.endDate,
      title:this.Cases.find(c => c.caseId === appt.caseId)?.title ||   '',
      applicationUserId: appt.applicationUserId,
      therapistId: appt.therapistId,
      userName: appt.userName || '',
      therapistName: this.therapists.find(t => t.therapistId === appt.therapistId)?.name || '',
      caseId: appt.caseId
    };

    this.schedulerService.saveScheduler(newScheduler).subscribe({
      next: () => {
        console.log('Appointment saved successfully.');
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Error saving appointment:', err);
      }
    });
  }
}