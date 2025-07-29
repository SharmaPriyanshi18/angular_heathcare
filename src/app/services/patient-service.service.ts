import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviornment/dev.enviornment';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.apiUrl;
  getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  getPatients() {
    return this.http.get<any>(`${this.baseUrl}Admin/patients`, {
      headers: this.getAuthHeaders()
    });
  }
}
