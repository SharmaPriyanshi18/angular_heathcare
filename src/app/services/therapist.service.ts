import { Therapist } from '../therapist/therapist.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviornment/dev.enviornment';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  url: string = environment.apiUrl;
  constructor(private HttpClient: HttpClient) {
  }

  getTherapists(): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}Therapist`);
  }

  saveTherapist(Therapist: Therapist): Observable<Therapist> {
    return this.HttpClient.post<Therapist>(`${this.url}Therapist/Upsert`, Therapist);
  }

  updateTherapist(Therapist: Therapist): Observable<Therapist> {
    return this.HttpClient.post<Therapist>(`${this.url}Therapist/Upsert`, Therapist);
  }

  deleteTherapist(id: number): Observable<any> {
    return this.HttpClient.delete<any>(`${this.url}Therapist/` + id);
  }
}
