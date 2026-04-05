import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/Sesion/auth';

  constructor(private http: HttpClient) {}

  register(data: { nombre: string; correo: string; contraseña: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(username: string, password: string): Observable<any> {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(`${this.baseUrl}/login`, body, { headers }).pipe(
      tap((tokens: any) => this.saveTokens(tokens))
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, { headers: this.authHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/me`, data, { headers: this.authHeaders() });
  }

  verifyPassword(password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-password`, { password }, { headers: this.authHeaders() });
  }

  refreshToken(): Observable<any> {
    const refresh_token = localStorage.getItem('refresh_token');
    return this.http.post(`${this.baseUrl}/refresh`, { refresh_token }).pipe(
      tap((tokens: any) => this.saveTokens(tokens))
    );
  }

  logout(): Observable<any> {
    const refresh_token = localStorage.getItem('refresh_token');
    return this.http.post(`${this.baseUrl}/logout`, { refresh_token }, { headers: this.authHeaders() }).pipe(
      tap(() => this.clearTokens())
    );
  }

  // Helpers
  private saveTokens(tokens: any) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('token_type', tokens.token_type || 'Bearer');
  }

  private clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    const type = localStorage.getItem('token_type') || 'Bearer';
    return new HttpHeaders({
      'Authorization': `${type} ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
