import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../patient';

export interface Case {
  caseId?: number;
  title: string;
  therapistId?: number;
  therapistName?: string;
 dateCreated: string;
  applicationUserId?: string;
}

export interface Therapist {
  therapistId: number;
  name: string;
  address: string;
}

@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  selectedPatient: Patient = new Patient();
  patients: Patient[] = [];
  filteredPatientList: Patient[] = [];
  cases: Case[] = [];
  titlesList: any[] = [];
  therapistsList: Therapist[] = [];

  searchText: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token) {
      alert('User not authenticated. Redirecting to login...');
      this.router.navigate(['/dashboard']);
      return;
    }

    if (role !== 'Admin') {
      alert('Access denied. Only Admins can access this page.');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadTherapists(() => {
      this.loadPatients();
      this.loadCases();
      this.loadTitles();
    });
  }

  getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  loadPatients(): void {
    this.http.get<Patient[]>('https://localhost:7209/api/Admin/patients', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.patients = data.filter(p =>
          !(p.userName.toLowerCase() === 'sacchu' && p.email.toLowerCase() === 'sacchu@gmail.com')
        );
        this.filteredPatientList = this.patients;
      },
      error: (err) => console.error('Failed to load patients:', err)
    });
  }

  loadCases(): void {
    this.http.get<Case[]>('https://localhost:7209/api/Case', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => this.cases = data,
      error: (err) => console.error('Failed to load cases:', err)
    });
  }

  loadTitles(): void {
    this.http.get<Case[]>('https://localhost:7209/api/Case', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.titlesList = [...(data.map(c => { return { title: c.title ,id : c.caseId}; }))];
        console.log('Loaded titles:', this.titlesList);
      },
      error: (err) => console.error('Failed to load titles:', err)
    });
  }

  loadTherapists(callback?: () => void): void {
    this.http.get<Therapist[]>('https://localhost:7209/api/Therapist', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.therapistsList = data;
        if (callback) callback();
      },
      error: (err) => console.error('Failed to load therapists:', err)
    });
  }

  onEditorPreparing(e: any) {
    if (e.dataField === 'therapistId' && e.parentType === 'dataRow') {
      e.editorOptions = {
        items: this.therapistsList,
        displayExpr: 'name',
        valueExpr: 'therapistId',
        placeholder: 'Select Therapist',
        searchEnabled: true,
        onValueChanged: (args: any) => {
          e.setValue(args.value);
          const selected = this.therapistsList.find(t => t.therapistId === args.value);
          if (selected) {
            const formData = e.component.option('formData');
            formData.therapistName = selected.name;
          }
        }
      };
    }
  }

  onInitNewRow(e: any) {
    const userId = localStorage.getItem('ApplicationUserId');
    e.data = {
      title: '',
      therapistId: 0,
      therapistName: '',
      dateCreated: new Date().toISOString(),
      applicationUserId: userId
    };
  }

  onRowInserted(e: any) {
    this.prepareCaseAndUpsert(e.data);
  }

  onRowUpdated(e: any) {
    this.prepareCaseAndUpsert(e.data);
  }

  prepareCaseAndUpsert(data: Case): void {
    if (!data.therapistId || data.therapistId === 0) {
      alert('Please select a valid therapist.');
      return;
    }

    this.http.post('https://localhost:7209/api/Case', data, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => this.loadCases(),
      error: err => {
        console.error('Upsert failed:', err);
        alert('Operation failed!');
      }
    });
  }

  onRowRemoved(e: any) {
    const caseId = e.data.caseId;
    this.http.delete(`https://localhost:7209/api/Case/${caseId}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => this.loadCases(),
      error: err => {
        console.error('Delete failed:', err);
        alert('Delete failed!');
      }
    });
  }

  onSearchChange() {
    const lowerSearch = this.searchText.toLowerCase();
    this.filteredPatientList = this.patients.filter(p =>
      p.userName.toLowerCase().includes(lowerSearch) ||
      p.email.toLowerCase().includes(lowerSearch)
    );
  }
}
