// src/app/servicesAPI/miembros.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class MiembrosService extends BaseService {
  private endpoint = '/miembros';

  constructor(http: HttpClient) {
    super(http);
  }

  obtenerMiembro(idMiembro: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/${idMiembro}`);
  }

  actualizarMiembro(idMiembro: number, data: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/${idMiembro}`, data);
  }

  eliminarMiembro(idMiembro: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${idMiembro}`);
  }

  obtenerConfiguracion(idMiembro: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/${idMiembro}/configuracion`);
  }

  actualizarConfiguracion(idMiembro: number, permisos: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/${idMiembro}/configuracion`, permisos);
  }

  darPermiso(idMiembro: number, tipo: string): Observable<any> {
    return this.actualizarConfiguracion(idMiembro, { [tipo]: true });
  }

  revocarPermiso(idMiembro: number, tipo: string): Observable<any> {
    return this.actualizarConfiguracion(idMiembro, { [tipo]: false });
  }
}