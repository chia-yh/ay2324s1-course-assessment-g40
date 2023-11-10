import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../_api/backend.api';

const API_URL = BACKEND_API + 'auth/';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      API_URL + 'signin',
      { username, password }, httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      API_URL + 'signup',
      { username, email, password }, httpOptions
    );
  }

  signout(): Observable<any> {
    return this.http.post(
      API_URL + 'signout',
      {}, httpOptions
    );
  }
}
