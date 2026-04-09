import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  usuario: any = { nombre: 'Usuario' };

  estadisticas: any = {
    hogares: 3,
    miembros: 5,
    tareas: 24,
    diasActivo: 127,
    ranking: [
      { nombre: 'Hogar A', valor: 432641 },
      { nombre: 'Hogar B', valor: 321000 },
      { nombre: 'Hogar C', valor: 210500 }
    ]
  };

  ngOnInit() {
    // Aquí podrías cargar datos reales desde localStorage o API
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const datos = JSON.parse(usuarioGuardado);
      this.usuario.nombre = datos.nombre || datos.usuario || 'Usuario';
    }
  }
}
