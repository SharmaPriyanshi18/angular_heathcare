import { Component, OnInit} from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import * as moment from 'moment';

export class Scheduler {
  schedulerId?: number;
  dateFrom!: Date;
  dateTo!: Date;
  title!: string;
  applicationUserId!: string;
  therapistIds: string = '';
  therapistNames?: string;
  userName?: string;
  startDate?: Date;
  endDate?: Date;
  caseId?: number;
  text?: string;
  id?: number;
  mappedData?: string[];
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

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadTherapists();
    this.loadPatients();
    this.loadCases();
  }

loadAppointments(): void {
    this.schedulerService.getScheduler().subscribe({
      next: (data: Scheduler[]) => {
        this.appointments = data.map((item) => {
          const mapped = item.title?.split(',').map((t) => t.trim()) ?? [];

          return {
            ...item,
            id: item.schedulerId,
            startDate: moment.utc(item.dateFrom).local().toDate(),
            endDate: moment.utc(item.dateTo).local().toDate(),
            text: item.title, // Scheduler uses `text` to display
            mappedData: mapped,
          };
        });

        console.log('Loaded appointments:', this.appointments);
      },
      error: (err) => console.error('Error loading appointments:', err),
    });
  }
  
  loadTherapists(): void {
    this.schedulerService.getTherapists().subscribe({
      next: (data) => (this.therapists = data),
      error: (err) => console.error('Error loading therapists:', err)
    });
  }

  loadPatients(): void {
    this.schedulerService.getPatients().subscribe({
      next: (data) => (this.Patients = data),
      error: (err) => console.error('Error loading patients:', err)
    });
  }

  loadCases(): void {
    this.schedulerService.getCases().subscribe({
      next: (data) => (this.Cases = data),
      error: (err) => console.error('Error loading cases:', err)
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
              dataField: 'therapistIds',
              label: { text: 'Therapists' },
              editorType: 'dxTagBox',
              editorOptions: {
                items: this.therapists,
                valueExpr: 'therapistId',
                displayExpr: 'name',
                searchEnabled: true,
                showSelectionControls: true,
                applyValueMode: 'useButtons',
                multiline: true,
                placeholder: 'Select therapists...',
                hideSelectedItems: false,
                showClearButton: true
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
                displayFormat: 'yyyy-MM-dd HH:mm',
                useMaskBehavior: true
              }
            },
            {
              dataField: 'endDate',
              label: { text: 'To' },
              editorType: 'dxDateBox',
              editorOptions: {
                type: 'datetime',
                displayFormat: 'yyyy-MM-dd HH:mm',
                useMaskBehavior: true
              }
            }
          ]
        }
      ]);
    }, 0);
  }

  onAppointmentAdding(e: any): void {
    const appt = e.appointmentData;
    e.cancel = true;

    const selectedTherapistIds: number[] = appt.therapistIds || [];
    const therapistNames = selectedTherapistIds
      .map(id => this.therapists.find(t => t.therapistId === id)?.name)
      .filter(name => !!name)
      .join(',');

    const newScheduler: Scheduler = {
      schedulerId: 0,
      dateFrom: appt.startDate,
      dateTo: appt.endDate,
      title: this.Cases.find(c => c.caseId === appt.caseId)?.title || '',
      applicationUserId: appt.applicationUserId,
      therapistIds: selectedTherapistIds.join(','),
      therapistNames: therapistNames,
      userName: this.Patients.find(p => p.id === appt.applicationUserId)?.userName || '',
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

  updatescheduler(scheduler: Scheduler): void {
    this.schedulerService.updateScheduler(scheduler).subscribe({
      next: () => {
        console.log('Schedule updated');
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Failed to update Schedule:', err);
      }
    });
  }

  onDeleteClick(appointment: Scheduler): void {
    const schedulerId = appointment.schedulerId ? appointment.schedulerId : appointment.id;

    if (!schedulerId) {
      console.warn('No schedulerId found in appointment:', appointment);
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this appointment?');
    if (!confirmed) return;

    this.schedulerService.deleteScheduler(schedulerId).subscribe({
      next: () => {
        console.log('Manual delete success');
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Manual delete failed:', err);
      }
    });
  }
}
