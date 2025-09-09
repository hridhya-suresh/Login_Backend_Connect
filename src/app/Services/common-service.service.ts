import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private baseUrl = 'https://localhost:44340/api/';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // console.log(data);
    return this.http.post(this.baseUrl + 'Account/Login', credentials);
  }

  async register(data: any): Promise<any> {
    // console.log(data);
    return this.http
      .post(this.baseUrl + 'Crud/insert-data', data)
      .pipe()
      .toPromise();
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'Crud/get-users');
  }
}
