import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost4200/:'; 

  constructor(private http: HttpClient) {}

  // Login
  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usuario, contrasena });
  }

  // Register
  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  // 🔥🔥🔥 RECUPERAR CONTRASEÑA - Método CORREGIDO 🔥🔥🔥
  recoverPassword(emailData: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, emailData);
  }

  // Método alternativo si prefieres pasar solo el email
  recoverPasswordByEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, { email });
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}