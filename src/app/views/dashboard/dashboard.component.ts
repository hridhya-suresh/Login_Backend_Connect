import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/Services/common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;

  constructor(
    private commonServise: CommonServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    try {
      this.loading = true;
      console.log('Fetching users...');

      // Check if token exists
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('No token found, redirecting to login');
        this.router.navigate(['/login']);
        return;
      }

      const response = await this.commonServise.getUsers().toPromise();
      console.log('Users fetched successfully:', response);
      this.users = response;
    } catch (error) {
      console.error('Error fetching users:', error);

      // If 401 error, redirect to login
      // if (error.status === 401) {
      //   console.log('Unauthorized, redirecting to login');
      //   localStorage.removeItem('authToken');
      //   this.router.navigate(['/login']);
      // } else {
      //   alert('Error fetching users');
      // }
    } finally {
      this.loading = false;
    }
  }
}
