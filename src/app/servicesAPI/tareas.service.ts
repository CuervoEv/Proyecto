// src/app/servicesAPI/tareas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class TareasService extends BaseService {
  private endpoint = '/tareas';

  constructor(http: HttpClient) {
    super(http);
  }

  listarTareasHogar(idHogar: number): Observable<any[]> {
    return this.get<any[]>(`/hogares/${idHogar}/tareas`);
  }

  crearTarea(idHogar: number, data: any): Observable<any> {
    return this.post<any>(`/hogares/${idHogar}/tareas`, data);
  }

  actualizarTarea(idTarea: number, data: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/${idTarea}`, data);
  }

  eliminarTarea(idTarea: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${idTarea}`);
  }

  asignarTarea(idTarea: number, data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/${idTarea}/asignar`, data);
  }

  completarTarea(idTarea: number): Observable<any> {
    return this.put<any>(`${this.endpoint}/${idTarea}/completar`, {});
  }

  obtenerTareasPendientesMiembro(idMiembro: number): Observable<any[]> {
    return this.get<any[]>(`/miembros/${idMiembro}/tareas/pendientes`);
  }
}