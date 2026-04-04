import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  usuario: any = null;

  estadisticas = {
    ahorro: 0,
    tiempo: 0,
    conflictos: 0,
    calidad: 0
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('usuario');
    this.usuario = data ? JSON.parse(data) : null;

    this.animarNumeros();
  }

  animarNumeros() {
    this.contar('ahorro', 30, 20);
    this.contar('tiempo', 3, 60);
    this.contar('conflictos', 60, 15);
    this.contar('calidad', 85, 10);
  }

  contar(prop: keyof typeof this.estadisticas, objetivo: number, velocidad: number) {
    let valor = 0;

    const intervalo = setInterval(() => {
      valor++;
      this.estadisticas[prop] = valor;

      if (valor >= objetivo) {
        clearInterval(intervalo);
      }
    }, velocidad);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}