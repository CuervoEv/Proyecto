import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/Sesion/auth/login'; // Sin Sesion
  
  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    // Convertir a formato x-www-form-urlencoded
    const body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);
    
    return this.http.post(this.apiUrl, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }
}