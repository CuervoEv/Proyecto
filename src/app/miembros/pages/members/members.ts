import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Miembro {
  nombre: string;
  rol: 'Administrador' | 'Miembro';
  pin: string;
}

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './members.html',
  styleUrls: ['./members.css']
})
export class MembersComponent {

  miembros: Miembro[] = [];
  nuevoNombre: string = '';
  nuevoPin: string = '';
  error: string = '';

  constructor(private router: Router) {}

  crearMiembro() {
    if (this.miembros.length >= 6) {
      this.error = '⚠ Límite de 6 miembros alcanzado';
      return;
    }
    if (!this.nuevoNombre.trim() || !this.nuevoPin.trim()) {
      this.error = '⚠ Ingresa nombre y PIN';
      return;
    }

    const rol = this.miembros.length === 0 ? 'Administrador' : 'Miembro';
    const miembro: Miembro = {
      nombre: this.nuevoNombre,
      rol,
      pin: this.nuevoPin
    };

    this.miembros.push(miembro);
    localStorage.setItem('miembros', JSON.stringify(this.miembros));

    this.nuevoNombre = '';
    this.nuevoPin = '';
    this.error = '';
  }

  ingresar(miembro: Miembro, pinIngresado: string) {
    if (pinIngresado === miembro.pin) {
      // Redirigir a hogares
      this.router.navigate(['/mis-hogares'], { queryParams: { miembro: miembro.nombre, rol: miembro.rol } });
    } else {
      this.error = '⚠ PIN incorrecto';
    }
  }
}
