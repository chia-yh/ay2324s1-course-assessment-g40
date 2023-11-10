import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../_api/backend.api';

const API_URL = BACKEND_API + 'user/';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserPage(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminPage(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  changePw(newPassword: string): Observable<any> {
    return this.http.post(
      API_URL + 'updateUser', {newPassword}, httpOptions);
  }
  
  deleteAcc(): Observable<any> {
    return this.http.post(
      API_URL + 'deleteUser', {}, httpOptions);
  }
}
