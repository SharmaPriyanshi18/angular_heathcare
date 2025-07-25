import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TherapistService } from '../services/therapist.service';

export class Therapist {
  therapistId?: number;
  name?: string;
  specialization?: string;
  address?: string;
  phoneNumber?: string;
}

@Component({
  selector: 'app-therapist',
  standalone: false,
  templateUrl: './therapist.component.html',
  styleUrl: './therapist.component.scss'
})
export class TherapistComponent implements OnInit {
  therapists: Therapist[] = [];

  showAddPopup: boolean = false;
  newTherapist: Therapist = {
    therapistId: 0,
    name: '',
    specialization: '',
    address: '',
    phoneNumber: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private therapistService: TherapistService
  ) { }

  ngOnInit() {
    this.loadTherapists();
  }

  loadTherapists(): void {
    this.therapistService.getTherapists().subscribe({
      next: (data) => {
        this.therapists = data;
        console.log("Loaded therapists:", this.therapists);
      },
      error: (err) => {
        console.error('Failed to load therapists:', err);
      }
    });
  }

  onAdd(): void {
    this.newTherapist = {
      therapistId: 0,
      name: '',
      specialization: '',
      address: '',
      phoneNumber: ''
    };
    this.showAddPopup = true;
  }

  onSaveNewTherapist(): void {
    this.saveTherapist(this.newTherapist);
    this.showAddPopup = false;
  }

  saveTherapist(therapist: Therapist): void {
    this.therapistService.saveTherapist(therapist).subscribe({
      next: () => {
        console.log('Therapist saved');
        this.loadTherapists();
      },
      error: (err) => {
        console.error('Failed to save therapist:', err);
      }
    });
  }

  updateTherapist(therapist: Therapist): void {
    this.therapistService.updateTherapist(therapist).subscribe({
      next: () => {
        console.log('Therapist updated');
        this.loadTherapists();
      },
      error: (err) => {
        console.error('Failed to update therapist:', err);
      }
    });
  }

  deleteTherapist(id: number): void {
    console.log('Attempting to delete therapist with ID:', id);
    this.therapistService.deleteTherapist(id).subscribe({
      next: () => {
        console.log('Therapist deleted');
        this.loadTherapists();
      },
      error: (err) => {
        console.error('Failed to delete therapist:', err);
      }
    });
  }

  onRowInserting(e: any) {
    const newTherapist = e.data as Therapist;
    console.log('Inserting:', newTherapist);
    this.saveTherapist(newTherapist);
  }

  onRowUpdating(e: any) {
    const updatedTherapist: Therapist = {
      therapistId: e.oldData.therapistId,
      name: e.newData.name ?? e.oldData.name,
      specialization: e.newData.specialization ?? e.oldData.specialization,
      address: e.newData.address ?? e.oldData.address,
      phoneNumber: e.newData.phoneNumber ?? e.oldData.phoneNumber
    };
    console.log('Updating:', updatedTherapist);
    this.updateTherapist(updatedTherapist);
  }

  onRowRemoving(e: any) {
    const id = e.data?.therapistId;
    if (id) {
      const confirmed = confirm(`Are you sure you want to delete therapist ID ${id}?`);
      if (confirmed) {
        this.deleteTherapist(id);
      }
    } else {
      console.warn('Cannot delete: Missing therapist ID');
    }
  }
}
