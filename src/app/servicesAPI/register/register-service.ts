import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
import { RegisterData } from '../../models/register-interface';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/Sesion/register'; // Cambia esta URL por la de tu backend
  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
