import { Scheduler } from '../scheduler/scheduler.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviornment/dev.enviornment';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  //****//
  constructor(private http: HttpClient) { }
  baseUrl: string = environment.apiUrl;
  getScheduler(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}scheduler/get-all`);
  }
  saveScheduler(Scheduler: Scheduler): Observable<Scheduler> {
    return this.http.post<Scheduler>(`${this.baseUrl}scheduler/create`, Scheduler);
  }
  updateScheduler(Scheduler: Scheduler): Observable<Scheduler> {
    return this.http.post<Scheduler>(`${this.baseUrl}scheduler/update`, Scheduler);
  }
  deleteScheduler(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}scheduler/delete/${id}`);
  }
  getTherapists(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Therapist`);
  }
  getPatients(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Admin/patients`);
  }
  getCases(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Disease`);
  }

}
