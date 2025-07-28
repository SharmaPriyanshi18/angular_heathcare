import { Scheduler } from './scheduler/scheduler.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  //****//
 constructor(private http: HttpClient) {}

  getScheduler(): Observable<any> {
    return this.http.get<any>("https://localhost:7209/api/scheduler/get-all");
  }
  saveScheduler(Scheduler: Scheduler): Observable<Scheduler> {
    return this.http.post<Scheduler>("https://localhost:7209/api/scheduler/create", Scheduler);
  }
  updateScheduler(Scheduler: Scheduler): Observable<Scheduler> {
    return this.http.post<Scheduler>("https://localhost:7209/api/Scheduler/Update", Scheduler);
  }
  deleteScheduler(id: number): Observable<any> {
    return this.http.delete<any>("https://localhost:7209/api/scheduler/delete/" + id);
  }
  getTherapists(): Observable<any> {
    return this.http.get<any>("https://localhost:7209/api/Therapist");
  }
  getPatients(): Observable<any>{
     return this.http.get<any>("https://localhost:7209/api/Admin/patients");
  }
  getCases(): Observable<any> {
    return this.http.get<any>("https://localhost:7209/api/Disease");
  }
}
