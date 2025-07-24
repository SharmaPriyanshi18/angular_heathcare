import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'healthcareangular1';
  isSidebarOpen: boolean = true;
  showLoginPopup: boolean = false;
  isLoggedIn: boolean = false;
  userRole: string = '';
  userImageUrl: string | null = null;

  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userRole = localStorage.getItem('userRole') || '';

    if (this.isLoggedIn) {
      this.setUserImageFromToken();
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

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
            const userId = decoded.nameid || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', userId);

            this.userRole = role;
            this.isLoggedIn = true;
            this.setUserImageFromToken();
            this.showLoginPopup = false;

            notify('Login successful', 'success', 2000);

            if (role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/dashboardpatient']);
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

  setUserImageFromToken(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const userId = decoded.nameid || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      if (userId) {
        this.userImageUrl = `https://localhost:7209/api/Image/${userId}`;
      }
    } catch (err) {
      console.error('Error extracting user ID from token:', err);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');

    this.isLoggedIn = false;
    this.userRole = '';
    this.userImageUrl = null;
    this.loginData = { username: '', password: '' };

    this.router.navigate(['/']);
    notify('Logged out successfully', 'info', 2000);
  }

  isPatient(): boolean {
    return this.userRole === 'Patient';
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }
  isNotLogin(): boolean {
    return !this.isLoggedIn;
  }
}
