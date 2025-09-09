import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/helpers/auth.service';
import { CommonServiceService } from 'src/app/Services/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  password: string = '';
  username: string = '';
  isRegisterModalVisible = false;
  activeForm: string = 'Sign-In'; // Track active form
  isLoading: boolean = false;

  constructor(
    private commonService: CommonServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async login() {
    console.log('Username:', this.username, this.password);
    this.isLoading = true;
    const credentials = {
      username: this.username,
      password: this.password,
    };

    try {
      const response = await this.commonService.login(credentials).toPromise();
      console.log('Login Response:', response);

      // Store token in localStorage
      if (response && response.accessToken) {
        localStorage.setItem('authToken', response.accessToken);
        console.log('Token stored:', response.accessToken);
        // Navigate to dashboard after successful login
        this.router.navigate(['dashboard']);
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (show message to user)
      alert('Login failed. Please check your credentials.');
    } finally {
      this.isLoading = false;
    }
  }

  loginForm() {
    this.activeForm = 'Sign-In';
    this.isRegisterModalVisible = false;
  }
  registration() {
    this.activeForm = 'Sign-Up';
    this.isRegisterModalVisible = true;
  }

  handleObservationOk() {
    this.isRegisterModalVisible = false;
  }

  handleObservationCancel(): void {
    this.isRegisterModalVisible = false;
  }
  async register() {
    let data = {
      name: this.username,
      password: this.password,
    };
    try {
      let retData = await this.commonService.register(data);
      console.log('Response:', retData);
      // this.router.navigate(['dashboard']);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
