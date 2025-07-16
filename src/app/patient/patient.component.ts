import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Patient {
  id: number = 0;
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  address: string = '';
  postalCode: string = '';
}

export interface Case {
  caseId: number;
  title: string;
  therapistName: string;
  address: string;
  dateCreated: string;
}

export interface Therapist {
  id: number;
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
  titlesList: string[] = [];
  therapistsList: Therapist[] = [];
  therapistNames: string[] = [];

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
    error: (err) => {
      console.error('Failed to load patients:', err);
    }
  });
}

  loadCases(): void {
    this.http.get<Case[]>('https://localhost:7209/api/Disease', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => { this.cases = data; },
      error: (err) => { console.error('Failed to load cases:', err); }
    });
  }

  loadTitles(): void {
    this.http.get<Case[]>('https://localhost:7209/api/Disease', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.titlesList = [...new Set(data.map(c => c.title))];
      },
      error: (err) => { console.error('Failed to load titles:', err); }
    });
  }

  loadTherapists(callback?: () => void): void {
    this.http.get<Therapist[]>('https://localhost:7209/api/Therapist', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.therapistsList = data;
        this.therapistNames = data.map(t => t.name);
        if (callback) callback(); 
      },
      error: (err) => { console.error('Failed to load therapists:', err); }
    });
  }

  onEditorPreparing(e: any) {
    if (e.parentType === 'dataRow') {
      if (e.dataField === 'title') {
        e.editorOptions.items = this.titlesList;
        e.editorOptions.searchEnabled = true;
        e.editorOptions.placeholder = 'Select Case Title';
      }

      if (e.dataField === 'therapistName') {
        e.editorOptions.items = this.therapistsList;
        e.editorOptions.valueExpr = 'name';
        e.editorOptions.displayExpr = 'name';
        e.editorOptions.searchEnabled = true;
        e.editorOptions.placeholder = 'Select Therapist';

        e.editorOptions.onValueChanged = (args: any) => {
          const formData = e.component.option('formData');
          const selected = this.therapistsList.find(t => t.name === args.value);
          if (selected) {
            formData.address = selected.address;
          }
        };
      }
    }
  }

  onInitNewRow(e: any) {
    e.data = {
      title: '',
      therapistName: '',
      address: '',
      dateCreated: new Date().toISOString().split('T')[0]
    };
  }

  onRowInserted(e: any) {
    this.upsertCase(e.data);
  }

  onRowUpdated(e: any) {
    this.upsertCase(e.data);
  }

  upsertCase(caseData: Case) {
    this.http.post('https://localhost:7209/api/Disease/Upsert', caseData, {
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

    this.http.delete(`https://localhost:7209/api/Disease/${caseId}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.loadCases();
      },
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
