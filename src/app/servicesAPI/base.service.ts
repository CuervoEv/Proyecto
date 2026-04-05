// src/app/servicesAPI/base.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseService {
  protected baseUrl: string = 'http://localhost:8000';

  constructor(protected http: HttpClient) {}

  /**
   * GET - Obtener recursos
   * @param endpoint Ruta sin la URL base (ej: /hogares)
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * POST - Crear recursos
   * @param endpoint Ruta sin la URL base
   * @param data Datos a enviar
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * PUT - Actualizar recursos
   * @param endpoint Ruta sin la URL base
   * @param data Datos a enviar
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * DELETE - Eliminar recursos
   * @param endpoint Ruta sin la URL base
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * POST para formularios (form-urlencoded)
   */
  postForm<T>(endpoint: string, data: string): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }
}