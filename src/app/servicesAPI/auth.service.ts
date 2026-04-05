import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  /**
   * Realiza login contra el backend
   */
  login(usuario: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    const body = new URLSearchParams();
    body.set('username', usuario);
    body.set('password', contrasena);
    // OAuth2PasswordRequestForm requiere application/x-www-form-urlencoded
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url, body.toString(), { headers });
  }
}