import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    const { username, password } = this.loginData;

    if (!username || !password) {
      notify('Please fill in both Username and Password', 'error', 2000);
      return;
    }

    this.http.post<any>('https://localhost:7209/api/Account/authenticate', this.loginData)
      .subscribe({
        next: (res) => {
          const token = res.token;
          localStorage.setItem('token', token);

          try {
            const decoded: any = jwtDecode(token);

            const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            localStorage.setItem('userRole', role);

            notify('Login successful', 'success', 2000);

            if (role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else if (role === 'Patient') {
              this.router.navigate(['/dashboard']);
            }

          } catch (error) {
            notify('Failed to decode token.', 'error', 3000);
            console.error('Token decode error:', error);
          }
        },

        error: (err) => {
          notify('Invalid credentials or server error', 'error', 3000);
          console.error('Login error:', err);
        }
      });
  }
}
