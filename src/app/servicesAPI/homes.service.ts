// src/app/servicesAPI/homes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class HomesService extends BaseService {
  private endpoint = '/hogares';

  constructor(http: HttpClient) {
    super(http);
  }

  listarHogares(): Observable<any[]> {
    return this.get<any[]>(`${this.endpoint}/`);
  }

  obtenerHogar(idHogar: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/${idHogar}`);
  }

  crearHogar(data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/`, data);
  }

  actualizarHogar(idHogar: number, nombre: string): Observable<any> {
    return this.put<any>(`${this.endpoint}/${idHogar}`, { nombre_familiar: nombre });
  }

  eliminarHogar(idHogar: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${idHogar}`);
  }

  listarMiembrosDelHogar(idHogar: number): Observable<any[]> {
    return this.get<any[]>(`${this.endpoint}/${idHogar}/miembros`);
  }

  agregarMiembroAlHogar(idHogar: number, data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/${idHogar}/miembros`, data);
  }

  listarTareasDelHogar(idHogar: number): Observable<any[]> {
    return this.get<any[]>(`${this.endpoint}/${idHogar}/tareas`);
  }

  crearTareaEnHogar(idHogar: number, data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/${idHogar}/tareas`, data);
  }
}