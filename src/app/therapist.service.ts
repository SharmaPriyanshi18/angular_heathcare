import { Therapist } from './therapist/therapist.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  constructor(private HttpClient: HttpClient) { }
  //****//
  getTherapists(): Observable<any> {
    return this.HttpClient.get<any>("https://localhost:7209/api/Therapist");
  }
  saveTherapist(Therapist: Therapist): Observable<Therapist> {
    return this.HttpClient.post<Therapist>("https://localhost:7209/api/Therapist/Upsert", Therapist);
  }
  updateTherapist(Therapist: Therapist): Observable<Therapist> {
    return this.HttpClient.post<Therapist>("https://localhost:7209/api/Therapist/Upsert", Therapist);
  }
  deleteTherapist(id: number): Observable<any> {
    return this.HttpClient.delete<any>("https://localhost:7209/api/Therapist/" + id);
  }
}
